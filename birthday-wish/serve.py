"""Serve the birthday-wish site locally with `python serve.py`."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = "127.0.0.1"
PORT = 8000


def main():
    site_directory = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=site_directory)

    with ThreadingHTTPServer((HOST, PORT), handler) as server:
        print(f"Serving the birthday wish at http://{HOST}:{PORT}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.", flush=True)


if __name__ == "__main__":
    main()
