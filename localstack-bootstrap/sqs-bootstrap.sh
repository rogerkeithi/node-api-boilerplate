#!/usr/bin/env bash

set -euo pipefail

# enable debug
# set -x

echo "======================================"
echo "Configuring sqs"
echo "======================================"
LOCALSTACK_HOST=localhost
AWS_REGION=us-east-1

create_queue() {
    local QUEUE_NAME_TO_CREATE=$1
    awslocal --endpoint-url=http://${LOCALSTACK_HOST}:4566 sqs create-queue --queue-name ${QUEUE_NAME_TO_CREATE} --region ${AWS_REGION} --attributes VisibilityTimeout=30
}
echo "======================================"
echo "Creating queues"
echo "======================================"
create_queue "user-queue"
create_queue "auth-queue"

echo "======================================"
echo "Queues created"
awslocal sqs list-queues
echo "======================================"

echo "Successfully created resources!"