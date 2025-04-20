#!/usr/bin/env bash

find src/photos -name "*.jxl" -type f -exec sh -c 'vips heifsave "$1" "${1%.jxl}.avif" --Q=92 --bitdepth=12 && rm "$1"' _ {} \;
