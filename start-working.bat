@echo off
echo Starting Share Dish with Working Configuration...
echo.
echo Starting Backend Server...
start "Server" cmd /k "cd server && npm run dev"
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start "Client" cmd /k "cd client && npm start"
echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause 