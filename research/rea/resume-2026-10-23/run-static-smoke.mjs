/** Auditoria REA de código próprio: não executa o alvo nem abre navegador. */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const [cli, reportDirectory, projectDirectory = process.cwd()] = process.argv.slice(2);
if (!cli || !reportDirectory) throw new Error('Uso: node run-static-smoke.mjs CLI REPORT_DIRECTORY [PROJECT_DIRECTORY]');
mkdirSync(reportDirectory, { recursive: true });
let failures = 0;
for (const [name, relativeTarget] of [['fixture', 'research/rea/fixture'], ['application-source', 'src']]) {
  const args = ['analyze-javascript-application', resolve(projectDirectory, relativeTarget), '--json', '--full-output', '--max-heap-mb', '512', '--analysis-timeout-ms', '60000', '--max-semantic-nodes', '25000'];
  const start = new Date().toISOString();
  const output = spawnSync(cli, args, { cwd: projectDirectory, encoding: 'utf8', timeout: 240000, maxBuffer: 256 * 1024 * 1024 });
  const stdout = output.stdout || '';
  const stderr = output.stderr || '';
  writeFileSync(join(reportDirectory, `${name}.analysis.json`), stdout);
  writeFileSync(join(reportDirectory, `${name}.stderr.txt`), stderr);
  const record = {
    start_utc: start, end_utc: new Date().toISOString(), command: [cli, ...args],
    exit_code: output.status, signal: output.signal, startup_error: output.error?.message || null,
    stdout_sha256: createHash('sha256').update(stdout).digest('hex'),
    stderr_sha256: createHash('sha256').update(stderr).digest('hex'),
    success: false,
  };
  let summary = {};
  try {
    const envelope = JSON.parse(stdout);
    const evidence = envelope.data || envelope;
    const result = evidence.normalized_result;
    const statistics = result?.statistics;
    record.success = output.status === 0 && typeof evidence.evidence_id === 'string'
      && /^ev_[a-f0-9]{64}$/.test(evidence.evidence_id)
      && Number(statistics?.parsed_javascript_files) > 0
      && statistics?.parse_failures === 0;
    summary = { evidence_id: evidence.evidence_id ?? null, operation: evidence.operation ?? null,
      statistics: statistics ?? null, limitations: evidence.limitations ?? null,
      confidence: evidence.confidence ?? null, authority: evidence.authority ?? null,
      environment: evidence.environment ?? null };
  } catch (error) { record.parse_error = error.message; }
  writeFileSync(join(reportDirectory, `${name}.command.json`), JSON.stringify(record, null, 2));
  writeFileSync(join(reportDirectory, `${name}.summary.json`), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ target: relativeTarget, ...record, summary }));
  if (!record.success) failures += 1;
}
process.exitCode = failures ? 1 : 0;
