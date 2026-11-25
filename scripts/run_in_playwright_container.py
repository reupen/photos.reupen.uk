#!/usr/bin/env python3
import argparse
import os
from pathlib import PurePath
from platform import system
from subprocess import run

from utils.pnpm import get_dependency_version

IS_WINDOWS = system() == "Windows"
ROOT_DIR = PurePath(__file__).parents[1]
CONTAINER_RUNNER = os.environ.get(
    "CONTAINER_RUNNER", "wslc" if IS_WINDOWS else "podman"
)

parser = argparse.ArgumentParser()
parser.add_argument("command")


def run_in_playwright_container(arg):
    playwright_version = get_dependency_version("@playwright/test")
    command = [
        CONTAINER_RUNNER,
        "run",
        "--rm",
        "-v",
        f"{ROOT_DIR.as_posix()}:/home/pwuser/",
        "-v",
        f"{ROOT_DIR.name}:/home/pwuser/node_modules/",
        "-v",
        f"{ROOT_DIR.name}-npm-cache:/home/pwuser/.npm/",
        "-v",
        f"{ROOT_DIR.name}-pnpm-store:/home/pwuser/node_modules/.pnpm-store/",
        "-w",
        "/home/pwuser/",
        "-it",
        "-e",
        "CI",
        "-e",
        "ASTRO_TELEMETRY_DISABLED=1",
        f"mcr.microsoft.com/playwright:v{playwright_version}",
        "bash",
        "-c",
        arg,
    ]
    run(command, check=True, shell=IS_WINDOWS)


if __name__ == "__main__":
    args = parser.parse_args()
    run_in_playwright_container(args.command)
