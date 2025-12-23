# Use Bullseye-slim to ensure libssl1.1 compatibility for Prisma
FROM node:20-bullseye-slim

# Install netcat-traditional (the Debian version of netcat)
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client for the Debian-Bullseye environment
RUN npx prisma generate

# Ensure the wait script is executable
RUN chmod +x wait-for-db.sh

# Start the application using your connection script
CMD ["./wait-for-db.sh", "db:5432", "--", "npm", "run", "start:dev"]