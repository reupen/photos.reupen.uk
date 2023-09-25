#!/usr/bin/env python3
from pathlib import Path, PurePath

ROOT_DIR = PurePath(__file__).parents[1]

IMAGES_DIR = Path(ROOT_DIR / "src/content/images")
OUTPUT_DIR = Path(ROOT_DIR / "dist/_astro")


def clean_up_for_extension(ext):
    for src_file in IMAGES_DIR.glob(f"*.{ext}"):
        matches = [*OUTPUT_DIR.glob(f"{src_file.stem}.????????.{ext}")]

        if len(matches) > 1:
            raise Exception(f"Found {len(matches)} matches for {src_file}")

        if matches:
            matches[0].unlink()


def main():
    clean_up_for_extension("webp")
    clean_up_for_extension("jpg")


if __name__ == "__main__":
    main()
