# PowerShell script to set up Share-Dish project

Write-Host "Setting up Share-Dish Project..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "Node.js is installed" -ForegroundColor Green

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
cd server; npm install; cd ..
Write-Host "Installing client dependencies..." -ForegroundColor Yellow
cd client; npm install; cd ..
Write-Host "Dependencies installed" -ForegroundColor Green

# Check if MongoDB is installed
if (!(Get-Command mongod -ErrorAction SilentlyContinue)) {
    Write-Host "MongoDB is not installed. Please install MongoDB Community Server from https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
} else {
    Write-Host "MongoDB service found" -ForegroundColor Green
    
    # Check if MongoDB service is running
    $service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
    if ($service -and $service.Status -eq "Running") {
        Write-Host "MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "Starting MongoDB..." -ForegroundColor Yellow
        Start-Service -Name "MongoDB" -ErrorAction SilentlyContinue
        Write-Host "MongoDB started" -ForegroundColor Green
    }
}

# Create environment files if they don't exist
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/share-dish
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
"@ | Out-File -FilePath ".env" -Encoding UTF8
}

if (!(Test-Path "server/.env")) {
    Write-Host "Creating server .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/share-dish
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
"@ | Out-File -FilePath "server/.env" -Encoding UTF8
}

Write-Host "Environment files created" -ForegroundColor Green
Write-Host "Setup complete! Run 'npm run dev' to start the application." -ForegroundColor Green 