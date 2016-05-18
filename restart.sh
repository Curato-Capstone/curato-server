#!/bin/bash

kill $(lsof -ti :8000)
export SESS_SECRET=$(uuidgen)
nohup node server.babel.js &