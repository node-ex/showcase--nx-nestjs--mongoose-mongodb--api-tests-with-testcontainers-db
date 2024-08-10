#!/usr/bin/env bash

set -e

docker container run \
    --rm \
    --tty \
    --interactive \
    --network showcase--network--default \
    mongo:7.0.12-jammy \
    mongosh \
    --host showcase--mongo \
    --port 27017
