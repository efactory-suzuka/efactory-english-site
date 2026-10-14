#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build:production
origin_url="$(git remote get-url origin)"
deploy_dir="$(mktemp -d /tmp/efactory-gh-pages.XXXXXX)"
trap 'rm -rf "$deploy_dir"' EXIT
git init --quiet --initial-branch=gh-pages "$deploy_dir"
git -C "$deploy_dir" config user.name "$(git config user.name)"
git -C "$deploy_dir" config user.email "$(git config user.email)"
git -C "$deploy_dir" remote add origin "$origin_url"
if git -C "$deploy_dir" ls-remote --exit-code --heads origin gh-pages >/dev/null; then
  git -C "$deploy_dir" fetch --quiet origin gh-pages
  git -C "$deploy_dir" checkout --quiet -B gh-pages FETCH_HEAD
  git -C "$deploy_dir" rm --quiet -r --ignore-unmatch .
else
  result=$?
  if [ "$result" -ne 2 ]; then
    printf '%s\n' 'Cannot inspect the publication branch; no push performed.' >&2
    exit "$result"
  fi
fi
cp -a dist-production/. "$deploy_dir/"
git -C "$deploy_dir" add --all
if git -C "$deploy_dir" diff --cached --quiet; then
  printf '%s\n' 'Publication branch already matches the build.'
else
  git -C "$deploy_dir" commit --quiet -m 'Publish eFactory English static website'
  git -C "$deploy_dir" push origin gh-pages
fi
