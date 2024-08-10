#!/usr/bin/env bash

set -e

docker container run \
  --name mongo \
  --rm \
  --init \
  --detach \
  --publish host_ip=0.0.0.0,published=27018,target=27017 \
  mongo:7.0.12-jammy \
  tail \
    -f \
    /dev/null
