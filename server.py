import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=======================================================")
                print("[*] GURU-UTSAV 2026: Teachers' Day Campus Portal")
                print(f"[*] Local Server running at: {url}")
                print(f"[*] Serving directory: {DIRECTORY}")
                print("Press Ctrl+C to stop the server.")
                print("=======================================================")
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError:
            print(f"Port {port} is busy, trying port {port + 1}...")
            port += 1

if __name__ == "__main__":
    run_server()
