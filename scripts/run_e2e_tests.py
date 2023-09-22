#!/usr/bin/env python3
from utils.container import run_in_playwright_container

if __name__ == "__main__":
    run_in_playwright_container("npm ci && npm exec --no -- playwright test")
