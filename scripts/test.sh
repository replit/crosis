#!/bin/bash
echo Add a repl token to use for tests:
read token

REPL_TOKEN=$token ./node_modules/.bin/jest test $@
