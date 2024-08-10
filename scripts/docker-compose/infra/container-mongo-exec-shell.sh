#!/usr/bin/env bash

set -e

docker container exec \
  --interactive \
  --tty \
  showcase--mongo \
  sh
