#!/bin/bash

docker history -q fcpindi/c-pac_gui >/dev/null 2>&1;
if ! [[ $? -eq 0 ]]; then
  ./tools/build_image.sh
fi

docker run \
  -it \
  -p 1212:1212 \
  -v `pwd`:/code \
  -v /code/node_modules \
  -e NODE_ENV=development \
  -e TARGET=browser \
  fcpindi/c-pac_gui
