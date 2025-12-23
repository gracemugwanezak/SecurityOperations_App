#!/bin/sh

# Usage: ./wait-for-db.sh db:5432 -- npm run start:dev

hostport="$1"
shift
shift
cmd="$@"

host=$(echo $hostport | cut -d: -f1)
port=$(echo $hostport | cut -d: -f2)

until nc -z "$host" "$port"; do
  echo "Waiting for database ($host:$port) to be ready..."
  sleep 2
done

echo "Database is up! Executing command: $cmd"
exec $cmd