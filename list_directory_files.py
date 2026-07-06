#!/usr/bin/env python3
"""Print all file names in a given directory."""

import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <directory>", file=sys.stderr)
        sys.exit(1)

    directory = Path(sys.argv[1])

    if not directory.is_dir():
        print(f"Error: '{directory}' is not a directory", file=sys.stderr)
        sys.exit(1)

    for entry in sorted(directory.iterdir()):
        if entry.is_file():
            print(entry.name)


if __name__ == "__main__":
    main()
