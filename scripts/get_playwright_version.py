#!/usr/bin/env python3
from utils.npm import get_dependency_version

if __name__ == "__main__":
    print(get_dependency_version("@playwright/test"))
