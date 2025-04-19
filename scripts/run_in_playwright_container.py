#!/usr/bin/env python3
import argparse
from pathlib import PurePath
from platform import system
from subprocess import run

from utils.npm import get_dependency_version

ROOT_DIR = PurePath(__file__).parents[1].as_posix()
IS_WIN = system() == "Windows"

parser = argparse.ArgumentParser()
parser.add_argument("command")


def run_in_playwright_container(arg):
    playwright_version = get_dependency_version("node_modules/@playwright/test")
    command = [
        "podman",
        "run",
        "--rm",
        "-v",
        f"{ROOT_DIR}:/home/pwuser/",
        "-v",
        "/home/pwuser/node_modules/",
        "-w",
        "/home/pwuser/",
        "-it",
        "-e",
        "CI",
        f"mcr.microsoft.com/playwright:v{playwright_version}",
        "bash",
        "-c",
        arg,
    ]
    run(command, check=True, shell=IS_WIN)


if __name__ == "__main__":
    args = parser.parse_args()
    run_in_playwright_container(args.command)
