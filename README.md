# C-PAC

A suite to manage, run and track your preprocessing pipelines.

## How to run

```bash
yarn run clean:all
# you may need to set the following environment variable locally (If yarn throws `ERR_OSSL_EVP_UNSUPPORTED`):
# export NODE_OPTIONS=--openssl-legacy-provider
yarn
yarn run dev:browser
```
 or, using Docker,

```bash
./tools/start_dev.sh
```

## Packaging for release

```bash
./tools/build_package.sh
```
