const http = require('http');

console.log('Checking Share Dish application status...\n');

// Check backend server
const checkBackend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000', (res) => {
      console.log('Backend Server (Port 5000): RUNNING');
      console.log(`   Status: ${res.statusCode}`);
      resolve(true);
    });
    
    req.on('error', () => {
      console.log('❌ Backend Server (Port 5000): NOT RUNNING');
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log('❌ Backend Server (Port 5000): TIMEOUT');
      resolve(false);
    });
  });
};

// Check frontend server
const checkFrontend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      console.log('Frontend Server (Port 3000): RUNNING');
      console.log(`   Status: ${res.statusCode}`);
      resolve(true);
    });
    
    req.on('error', () => {
      console.log('❌ Frontend Server (Port 3000): NOT RUNNING');
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log('❌ Frontend Server (Port 3000): TIMEOUT');
      resolve(false);
    });
  });
};

// Run checks
async function checkStatus() {
  const backendRunning = await checkBackend();
  const frontendRunning = await checkFrontend();
  
  console.log('\nSummary:');
  if (backendRunning && frontendRunning) {
    console.log('Both servers are running!');
    console.log('Backend: http://localhost:5000');
    console.log('Frontend: http://localhost:3000');
  } else if (backendRunning) {
    console.log('Only backend is running. Frontend may need to be started.');
  } else if (frontendRunning) {
    console.log('Only frontend is running. Backend may need to be started.');
  } else {
    console.log('Neither server is running.');
    console.log('Try running: npm run dev');
  }
}

checkStatus(); 