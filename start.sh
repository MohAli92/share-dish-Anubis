#!/bin/bash

echo "Starting Share-Dish Application..."

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "Installing MongoDB..."
    # Add MongoDB installation commands here
    echo "MongoDB installed and started"
else
    echo "MongoDB already installed"
fi

# Start MongoDB service
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log
fi

# Install dependencies
echo "Installing root dependencies..."
npm install

echo "Installing server dependencies..."
cd server && npm install && cd ..

echo "Installing client dependencies..."
cd client && npm install && cd ..

echo "All dependencies installed!"

# Start the application
npm run dev 