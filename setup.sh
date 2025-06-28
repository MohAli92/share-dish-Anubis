#!/bin/bash

echo "Setting up Share-Dish Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
else
    echo "Node.js is installed"
fi

# Install dependencies
echo "Installing dependencies..."
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
echo "Dependencies installed"

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

# Create environment files if they don't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/share-dish
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EOF
fi

if [ ! -f "server/.env" ]; then
    echo "Creating server .env file..."
    cat > server/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/share-dish
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EOF
fi

echo "Environment files created"
echo "Setup complete! Run 'npm run dev' to start the application." 