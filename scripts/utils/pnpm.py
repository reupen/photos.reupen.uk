#!/usr/bin/env python3
from json import loads
from platform import system
from subprocess import run


def get_dependency_version(package):
    result = run(
        ["pnpm", "why", "--json", package],
        capture_output=True,
        check=True,
        shell=system() == "Windows",
    )
    data = loads(result.stdout)

    if len(data) != 1:
        raise ValueError(f"{len(data)} package versions found; 1 expected")

    return data[0]["version"]
