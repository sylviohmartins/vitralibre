/** REA 6.7.0: leitura estática de quatro scripts públicos previamente observados.
 * Não executa os scripts, não abre navegador e não publica código de terceiros.
 * Uso: node run-public-bundles.mjs /absolute/path/to/rea /absolute/report/dir
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { isAbsolute, join, resolve, relative } from 'node:path';

const SOURCES = Object.freeze([
  { id: 'kicatalogo-template', page: 'https://demo2.kicatalogo.com/produto/74', dom_observed_utc: '2026-10-24T01:36:47.542Z', url: 'https://demo2.kicatalogo.com/_core/_cdn/app/js/template.js' },
  { id: 'kicatalogo-lgpd', page: 'https://demo2.kicatalogo.com/produto/74', dom_observed_utc: '2026-10-24T01:36:47.542Z', url: 'https://demo2.kicatalogo.com/_core/_cdn/app/js/lgpd.js' },
  { id: 'gopage-app', page: 'https://modelodepapelaria.gopage.bio/', dom_observed_utc: '2026-10-24T01:37:32.659Z', url: 'https://modelodepapelaria.gopage.bio/build/assets/App-OL0Hejxd.js' },
  { id: 'stoqui-catalog-page', page: 'https://lilo-kids.stoqui.shop/', dom_observed_utc: '2026-10-24T01:37:51.551Z', url: 'https://lilo-kids.stoqui.shop/_next/static/chunks/app/%5Bslug_loja%5D/(main_layout)/page-a2fe436ab9592302.js?dpl=dpl_4GCw4M1KycuXhxijSCZodLvQzUyg' },
]);
const ALLOWLIST = new Set(SOURCES.map(source => source.url));
const STAT_KEYS = ['relevant_files', 'nested_asar_containers', 'text_bytes_read', 'invalid_utf8_files', 'parsed_javascript_files', 'skipped_javascript_files', 'visited_ast_nodes', 'findings', 'modules', 'parse_failures'];
const NODE_KINDS = new Set(['package', 'installer', 'artifact', 'asar-entry', 'electron-main', 'electron-preload', 'electron-renderer', 'electron-utility', 'javascript-asset', 'javascript-chunk', 'javascript-module', 'javascript-expression', 'source-map', 'source-module', 'browser-window', 'frame', 'target', 'context-bridge-api', 'ipc-channel', 'ipc-handler', 'worker', 'service-worker', 'endpoint', 'storage', 'native-addon', 'native-export', 'managed-assembly', 'managed-module', 'managed-type', 'managed-method', 'managed-field', 'managed-pinvoke-import', 'managed-native-implementation', 'runtime-script-instance', 'unknown']);
const RELATIONS = new Set(['contains', 'loads', 'imports', 'maps_to', 'exposes', 'sends', 'invokes', 'handles', 'calls', 'accesses', 'persists_to', 'observed_as', 'changed_from']);
const MAX_BYTES = 2 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 30000;
const EXPECTED_VERSION = '6.7.0';
const MIME_TYPES = new Set(['text/javascript', 'application/javascript', 'application/x-javascript', 'application/ecmascript', 'text/ecmascript', 'text/plain', 'application/octet-stream']);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const safeNumber = value => Number.isSafeInteger(value) && value >= 0 ? value : null;
function countKnown(rows, property, allowed) {
  if (!Array.isArray(rows)) return null;
  const counts = {};
  for (const row of rows) {
    const key = allowed.has(row?.[property]) ? row[property] : 'other-schema-kind';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
function limitationMetadata(evidence, normalized) {
  const outer = Array.isArray(evidence.limitations) ? evidence.limitations : [];
  const inner = Array.isArray(normalized.limitations) ? normalized.limitations : [];
  const categories = new Set();
  // Classifica sem devolver strings, locais, URLs ou trechos derivados da fonte.
  for (const value of [...outer, ...inner]) {
    if (typeof value !== 'string') { categories.add('unclassified'); continue; }
    if (/limit|budget|bound|truncat|omitt|partial|coverage/i.test(value)) categories.add('bounded-or-partial-coverage');
    if (/resolv|dependency|import|external/i.test(value)) categories.add('unresolved-or-external-dependency');
    if (/runtime|execut|dynamic/i.test(value)) categories.add('runtime-not-established');
    if (/parse|syntax|utf/i.test(value)) categories.add('parsing-or-encoding');
    if (/source.?map/i.test(value)) categories.add('source-map-limitation');
  }
  if (outer.length + inner.length && !categories.size) categories.add('unclassified');
  return { evidence_count: outer.length, analysis_count: inner.length, categories: [...categories].sort(),
    publication_policy: 'Original limitation text withheld; may contain source-derived text. Counts do not establish full coverage.',
    scope: 'Only the explicitly listed observed scripts per target; no imported chunks, source maps, runtime behavior, private endpoints or backend inspected.' };
}
function publicEvidence(envelope) {
  const evidence = envelope?.data || envelope;
  const normalized = evidence?.normalized_result;
  if (!normalized || !/^ev_[a-f0-9]{64}$/.test(evidence.evidence_id || '')) return null;
  const stats = {};
  for (const key of STAT_KEYS) stats[key] = safeNumber(normalized.statistics?.[key]);
  const graph = normalized.graph;
  return { evidence_id: evidence.evidence_id,
    operation: evidence.operation === 'analyze_javascript_application' ? evidence.operation : 'static-javascript-analysis',
    statistics: stats,
    confidence: ['observed', 'derived', 'inferred'].includes(evidence.confidence) ? evidence.confidence : null,
    authority: ['shipped-artifact', 'controlled-replay', 'historical-reference', 'external-service', 'analyst-inference'].includes(evidence.authority) ? evidence.authority : null,
    limitations: limitationMetadata(evidence, normalized),
    structural_counts: { nodes: Array.isArray(graph?.nodes) ? graph.nodes.length : null,
      edges: Array.isArray(graph?.edges) ? graph.edges.length : null,
      node_kinds: countKnown(graph?.nodes, 'kind', NODE_KINDS), relations: countKnown(graph?.edges, 'relation', RELATIONS) },
    interpretation: 'Counts are static syntax/graph observations, not bugs, vulnerabilities or verified user-facing features.' };
}
function knownFailure(envelope) {
  const payload = envelope?.error || envelope?.data || envelope;
  const code = payload?.code || payload?.error?.code;
  return ['capability_unavailable', 'unsupported_target', 'invalid_input', 'analysis_timeout', 'cancelled'].includes(code) ? code : 'analysis-or-output-failure';
}
async function fetchBounded(source) {
  if (!ALLOWLIST.has(source.url) || new URL(source.url).protocol !== 'https:') throw new Error('allowlist-rejection');
  const signal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
  const response = await fetch(source.url, { redirect: 'manual', credentials: 'omit', signal });
  const mime = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const metadata = { http_status: response.status, mime: /^[a-z0-9.+-]+\/[a-z0-9.+-]+$/.test(mime) ? mime : null };
  if (response.status !== 200) { await response.body?.cancel(); return { metadata, blocked: response.status >= 300 && response.status < 400 ? 'redirect-not-followed' : 'http-rejection' }; }
  if (!MIME_TYPES.has(mime)) { await response.body?.cancel(); return { metadata, blocked: 'unexpected-mime' }; }
  const length = Number(response.headers.get('content-length'));
  if (Number.isFinite(length) && length > MAX_BYTES) { await response.body?.cancel(); return { metadata, blocked: 'declared-size-limit' }; }
  if (!response.body) return { metadata, blocked: 'empty-response' };
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BYTES) { await reader.cancel(); return { metadata: { ...metadata, bytes_read_before_block: bytes }, blocked: 'stream-size-limit' }; }
    chunks.push(Buffer.from(value));
  }
  if (!bytes) return { metadata, blocked: 'empty-response' };
  const body = Buffer.concat(chunks, bytes);
  return { metadata: { ...metadata, bytes, source_sha256: sha256(body) }, body };
}

const [cli, reportArgument] = process.argv.slice(2);
if (!cli || !reportArgument || !isAbsolute(cli) || !isAbsolute(reportArgument)) throw new Error('CLI e REPORT_DIR devem ser caminhos absolutos.');
const reportDirectory = resolve(reportArgument);
mkdirSync(reportDirectory, { recursive: true });
const versionCheck = spawnSync(cli, ['--version'], { encoding: 'utf8', timeout: 10000, maxBuffer: 1024 });
if (versionCheck.status !== 0 || versionCheck.stdout.trim() !== EXPECTED_VERSION) throw new Error('REA official pinned version check failed; no public resource was fetched.');
const inputRoot = mkdtempSync(join(process.env.RUNNER_TEMP || tmpdir(), 'vitralibre-public-rea-input-'));
if (!relative(inputRoot, reportDirectory).startsWith('..')) { rmSync(inputRoot, { recursive: true, force: true }); throw new Error('Input temporário e output público devem permanecer separados.'); }
const report = { schema: 'vitralibre-public-rea-summary-v1', started_utc: new Date().toISOString(), tool: { name: 'rea-agents', version: EXPECTED_VERSION },
  policy: { exact_urls_only: true, maximum_sources: 4, bytes_per_source_max: MAX_BYTES, fetch_timeout_ms: FETCH_TIMEOUT_MS, redirects: false, retries: 0, authentication: false, javascript_executed: false, browser_used: false, source_maps_fetched: false, raw_source_or_analysis_published: false }, results: [] };
let cleanupSucceeded = false;
try {
  for (const source of SOURCES) {
    const result = { id: source.id, source_url: source.url, canonical_page: source.page, dom_observed_utc: source.dom_observed_utc,
      source_discovery: 'Exact script URL observed in legitimate anonymous CUA DOM session; observation supplied by coordinator.',
      fetch_started_utc: new Date().toISOString(), status: 'blocked', successful_parse: false };
    report.results.push(result);
    let fetched;
    try { fetched = await fetchBounded(source); }
    catch (error) { result.block_reason = ['TimeoutError', 'AbortError'].includes(error?.name) ? 'fetch-timeout' : 'network-or-fetch-rejection'; continue; }
    Object.assign(result, fetched.metadata);
    if (fetched.blocked) { result.block_reason = fetched.blocked; continue; }
    const target = join(inputRoot, source.id);
    mkdirSync(target, { mode: 0o700 });
    writeFileSync(join(target, 'observed-public-script.js'), fetched.body, { mode: 0o600 });
    const args = ['analyze-javascript-application', target, '--json', '--full-output', '--max-heap-mb', '512', '--analysis-timeout-ms', '60000', '--max-semantic-nodes', '25000'];
    const analysis = spawnSync(cli, args, { encoding: 'utf8', timeout: 150000, maxBuffer: 128 * 1024 * 1024 });
    // Originais permanecem somente sob runnerTEMP; nunca entram no REPORT_DIR.
    writeFileSync(join(inputRoot, `${source.id}.raw-rea.json`), analysis.stdout || '', { mode: 0o600 });
    writeFileSync(join(inputRoot, `${source.id}.raw-stderr.txt`), analysis.stderr || '', { mode: 0o600 });
    result.analysis_exit_code = Number.isInteger(analysis.status) ? analysis.status : null;
    result.analysis_ended_utc = new Date().toISOString();
    let envelope;
    try { envelope = JSON.parse(analysis.stdout || ''); }
    catch { result.block_reason = analysis.error?.code === 'ETIMEDOUT' ? 'analysis-timeout' : 'invalid-or-missing-tool-json'; continue; }
    const metadata = publicEvidence(envelope);
    if (metadata) result.analysis = metadata;
    if (analysis.status !== 0 || !metadata) { result.block_reason = knownFailure(envelope); continue; }
    const statistics = metadata.statistics;
    if (!(statistics.parsed_javascript_files > 0) || statistics.parse_failures !== 0 || statistics.invalid_utf8_files !== 0) { result.block_reason = 'incomplete-or-failed-parse'; continue; }
    result.status = 'analyzed-static';
    result.successful_parse = true;
  }
} finally {
  try { rmSync(inputRoot, { recursive: true, force: true }); cleanupSucceeded = true; } catch { cleanupSucceeded = false; }
  report.ended_utc = new Date().toISOString();
  report.raw_temporary_inputs_deleted = cleanupSucceeded;
  report.successful_parse_count = report.results.filter(result => result.successful_parse).length;
  writeFileSync(join(reportDirectory, 'public-bundles.summary.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report));
console.log(JSON.stringify({ report: 'public-bundles.summary.json', successful_parse_count: report.successful_parse_count,
  raw_temporary_inputs_deleted: cleanupSucceeded, targets: report.results.map(({ id, status, block_reason, analysis }) => ({ id, status, block_reason, evidence_id: analysis?.evidence_id || null })) }));
process.exitCode = report.successful_parse_count > 0 && cleanupSucceeded ? 0 : 1;
