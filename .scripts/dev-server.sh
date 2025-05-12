#!/bin/bash
# Run Firebase emulators and Nuxt in parallel

firebase emulators:start &
nuxt dev

# Kill emulators when Nuxt exits
trap "kill $!" EXIT

