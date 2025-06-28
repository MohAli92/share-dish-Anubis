@echo off
echo Starting Share Dish in Codespaces...
echo.
echo Installing dependencies...
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
echo.
echo Starting development server...
npm run dev 