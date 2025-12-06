#!/bin/bash

# Add all changes
git add .

# Commit changes with a timestamp
git commit -m "Auto-update: $(date +'%Y-%m-%d %H:%M:%S')"

# Push changes to the remote repository
git push origin main  # Change 'main' to your branch name if needed

echo "Changes pushed successfully!"