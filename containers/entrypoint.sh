#!/bin/sh

rabbitmq_host="rabbitmq"
connection_attempts=0
max_attempts=10
sleep_seconds=5

while [ $connection_attempts -lt $max_attempts ]; do
  nc -z $rabbitmq_host 5672
  result=$?
  if [ $result -eq 0 ]; then
    echo "Connected to RabbitMQ. Starting the application..."
    exec python $ANALYZER_SCRIPT
  fi
  echo "Cannot connect to RabbitMQ. Retrying in $sleep_seconds seconds..."
  connection_attempts=$((connection_attempts + 1))
  sleep $sleep_seconds
done

echo "Failed to connect to RabbitMQ after $max_attempts attempts. Exiting."
exit 1
