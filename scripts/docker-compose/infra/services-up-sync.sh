#!/usr/bin/env bash

set -e

./scripts/services-run.sh --detach $@

MONGO_CONTAINER_NAME="showcase--mongo"

while [ "$(docker inspect --format='{{.State.Health.Status}}' "$MONGO_CONTAINER_NAME")" != "healthy" ]; do
    sleep 5
done

# npm run migrations:run
