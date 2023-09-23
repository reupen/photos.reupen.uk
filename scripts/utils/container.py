#!/usr/bin/env python3
from pathlib import PurePath
from subprocess import run

from .npm import get_dependency_version

ROOT_DIR = PurePath(__file__).parents[2].as_posix()


def run_in_playwright_container(command):
    playwright_version = get_dependency_version("node_modules/@playwright/test")
    command = [
        "podman",
        "run",
        "--rm",
        "-v",
        f"{ROOT_DIR}:/home/pwuser/",
        "-v",
        f"/home/pwuser/node_modules/",
        "-w",
        "/home/pwuser/",
        "-it",
        "-e",
        "CI",
        f"mcr.microsoft.com/playwright:v{playwright_version}",
        "bash",
        "-c",
        command,
    ]
    run(command, check=True, shell=True)
