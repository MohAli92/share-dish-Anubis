# API URL Configuration

## How it works

The application now automatically detects the correct API URL based on the environment:

### 1. Local Development
- When running on `localhost`, it uses `http://localhost:5000`
- No configuration needed

### 2. GitHub Codespaces
- Automatically detects if running on `github.dev`
- Extracts the codespace URL and changes port from 3000 to 5000
- Example: `https://fluffy-doodle-699gw4qj7ww4crwp9-3000.app.github.dev` → `https://fluffy-doodle-699gw4qj7ww4crwp9-5000.app.github.dev`

### 3. Custom Configuration
- If you want to override the auto-detection, set `REACT_APP_API_URL` in `.env` file
- Example: `REACT_APP_API_URL=https://your-custom-api.com`

## File Structure

```
client/
├── src/
│   ├── api.ts          # Contains the dynamic URL detection logic
│   └── App.tsx         # Shows debug info in console
├── .env                # Optional: for custom API URL
└── package.json        # No proxy needed anymore
```

## Debug Information

When the app starts, check the browser console to see:
- Current environment variables
- Detected API URL
- Current page URL and hostname

This helps verify that the correct API URL is being used. 