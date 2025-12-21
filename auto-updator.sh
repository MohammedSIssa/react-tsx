#!/bin/bash

git add .

git commit -m "Auto-update: $(date +'%Y-%m-%d %H:%M:%S')"

git push origin main

echo "Changes pushed successfully!"

echo "Pushing to gh-pages"

npm run build

npm run deploy