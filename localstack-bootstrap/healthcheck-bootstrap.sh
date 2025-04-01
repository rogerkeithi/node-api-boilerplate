#!/usr/bin/env bash

set -euo pipefail

# enable debug
# set -x

echo "======================================"
echo "Creating S3 to healthcheck"
echo "======================================"
awslocal s3 mb s3://health

echo "Successfully created resources!"