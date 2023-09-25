#!/usr/bin/env python3
from json import load


def get_dependency_version(key):
    with open("package-lock.json") as file:
        lockfile_data = load(file)

    return lockfile_data["packages"][key]["version"]
