#!/bin/sh

error_found=0

for file in "$@"; do
  filename=$(basename "$file")
  if echo "$filename" | grep -qE '^[A-Z]'; then
    echo "Error: '$file' starts with an uppercase letter."
    error_found=1
  fi
done

if [ $error_found -ne 0 ]; then
  echo "Commit aborted: one or more files have names starting with uppercase letters."
  exit 1
fi
