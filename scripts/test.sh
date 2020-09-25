#!/bin/bash
echo Add token secret for tests:
read secret

TOKEN_SECRET=$secret ./node_modules/.bin/jest --no-cache test $@
NODE_ENV="test"
