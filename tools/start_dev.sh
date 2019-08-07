#!/bin/bash

docker run \
  -it \
  -p 1212:1212 \
  --entrypoint=/bin/sh \
  -v `pwd`:/code \
  -v /code/node_modules \
  -e NODE_ENV=development \
  -e TARGET=browser \
  -w /code \
  node:8-alpine \
  -c 'yarn && yarn run link && yarn run dev:browser'
