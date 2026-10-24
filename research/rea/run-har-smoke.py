"""Captura HTTP local própria (urllib, sem navegador) e teste MCP REA fixado.
Uso: python3 run-har-smoke.py /caminho/para/rea
"""
import datetime, functools, http.server, json, pathlib, subprocess, sys, threading, time, urllib.request
root = pathlib.Path(__file__).resolve().parent
class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(root / 'fixture')))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/index.js'
started = datetime.datetime.now(datetime.timezone.utc).isoformat()
t0 = time.perf_counter()
with urllib.request.urlopen(url) as response:
    body = response.read().decode('utf-8')
    status, headers = response.status, list(response.headers.items())
elapsed = (time.perf_counter() - t0) * 1000
server.shutdown()
entry = {'startedDateTime': started, 'time': elapsed,
    'request': {'method': 'GET', 'url': url, 'httpVersion': 'HTTP/1.1', 'cookies': [], 'headers': [], 'queryString': [], 'headersSize': -1, 'bodySize': 0},
    'response': {'status': status, 'statusText': 'OK', 'httpVersion': 'HTTP/1.0', 'cookies': [], 'headers': [{'name': k, 'value': v} for k, v in headers], 'content': {'size': len(body.encode()), 'mimeType': 'text/javascript', 'text': body}, 'redirectURL': '', 'headersSize': -1, 'bodySize': len(body.encode())},
    'cache': {}, 'timings': {'send': 0, 'wait': elapsed, 'receive': 0}}
har = root / 'fixture' / 'local-http.har'
har.write_text(json.dumps({'log': {'version': '1.2', 'creator': {'name': 'vitrine-aberta-urllib-audit', 'version': '1.0'}, 'entries': [entry]}}, indent=2))
p = subprocess.Popen([sys.argv[1], 'mcp'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
def request(i, method, params):
    p.stdin.write(json.dumps({'jsonrpc': '2.0', 'id': i, 'method': method, 'params': params}) + '\n'); p.stdin.flush()
    while True:
        line = p.stdout.readline()
        if not line:
            raise RuntimeError('MCP encerrou stdout')
        result = json.loads(line)
        if result.get('id') == i:
            return result
try:
    initialized = request(1, 'initialize', {'protocolVersion': '2025-11-25', 'capabilities': {}, 'clientInfo': {'name': 'vitrine-aberta-audit', 'version': '1.0'}})
    p.stdin.write(json.dumps({'jsonrpc': '2.0', 'method': 'notifications/initialized'}) + '\n'); p.stdin.flush()
    call = {'name': 'inspect_web_network_capture', 'arguments': {'capture_path': str(har), 'format': 'har'}}
    result = request(2, 'tools/call', call)
    (root / 'logs' / 'har-smoke.request.json').write_text(json.dumps(call, indent=2))
    (root / 'logs' / 'har-smoke.response.json').write_text(json.dumps(result, indent=2))
    print(json.dumps({'http_status': status, 'body_bytes': len(body.encode()), 'isError': result.get('result', {}).get('isError'), 'response_keys': list(result.get('result', {}).keys())}))
    print(json.dumps(result)[:1400])
finally:
    p.terminate(); p.wait(timeout=5)
