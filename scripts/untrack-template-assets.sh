#!/usr/bin/env bash
# Untrack template docs and Cursor rules in this repository.
# Use when preparing a project for client handover or when you do not want to
# ship template documentation and Cursor rules. See docs/untrack-template-assets.md.

set -e
cd "$(git rev-parse --show-toplevel)"

GITIGNORE=".gitignore"
MARKER="Untrack template docs and Cursor rules"

# Ensure .gitignore contains our block (idempotent)
if [ ! -f "$GITIGNORE" ] || ! grep -q "$MARKER" "$GITIGNORE"; then
  echo "" >> "$GITIGNORE"
  echo "# $MARKER (run scripts/untrack-template-assets.sh)" >> "$GITIGNORE"
  echo "/docs" >> "$GITIGNORE"
  echo "/.cursor" >> "$GITIGNORE"
  echo "Updated .gitignore"
else
  echo ".gitignore already ignores /docs and /.cursor"
fi

# Stop tracking paths (ignore errors if not tracked or missing)
git rm -r --cached docs 2>/dev/null && echo "Stopped tracking docs" || true
git rm -r --cached .cursor 2>/dev/null && echo "Stopped tracking .cursor" || true

echo ""
echo "Done. Next steps:"
echo "  1. git add .gitignore"
echo "  2. git status   # confirm docs and .cursor are untracked"
echo "  3. git commit -m \"Untrack template docs and Cursor rules\""
echo ""
echo "Files in docs/ and .cursor/ remain on disk but are no longer versioned."
echo "To remove them from disk: rm -rf docs .cursor"
