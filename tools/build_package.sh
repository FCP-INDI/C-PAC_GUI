#!/bin/bash

docker history -q fcpindi/c-pac_gui >/dev/null 2>&1;
if ! [[ $? -eq 0 ]]; then
  ./tools/build_image.sh
fi

docker run \
  -it \
  -v `pwd`:/code \
  -v `pwd`/release:/code/release \
  -v /code/node_modules \
  -e TARGET=electron \
  fcpindi/c-pac_gui \
  yarn run build
