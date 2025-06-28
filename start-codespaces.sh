#!/bin/bash

echo "Starting Share Dish application in Codespaces..."

# Function to start server
start_server() {
    echo "Starting server on port 5000..."
    cd server
    npm run dev &
    SERVER_PID=$!
    cd ..
    echo "Server started with PID: $SERVER_PID"
}

# Function to start client
start_client() {
    echo "Starting client on port 3000..."
    cd client
    npm start &
    CLIENT_PID=$!
    cd ..
    echo "Client started with PID: $CLIENT_PID"
}

# Start both servers
start_server
sleep 3
start_client

echo ""
echo "Both servers are now running!"
echo "Server: http://localhost:5000"
echo "Client: http://localhost:3000"
echo ""
echo "In Codespaces, you can access the app using the 'Open in Browser' button"
echo "or by clicking the ports in the Ports tab."
echo ""
echo "To stop both servers, press Ctrl+C"

# Wait for user to stop
wait 