@echo off
REM Healthy Choices Setup Script for Windows
REM Run: setup.bat

echo.
echo 🥣 Healthy Choices Setup
echo ========================
echo.

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Create env file
if not exist .env.local (
    echo.
    echo 🔐 Creating .env.local template...
    copy .env.example .env.local
    echo ⚠️  Please fill in your Supabase credentials in .env.local
) else (
    echo ✅ .env.local already exists
)

echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. Update .env.local with your Supabase credentials
echo 2. Run 'npm run dev' to start development server
echo 3. Visit http://localhost:3000
echo.
echo Happy coding! 🚀
echo.
pause
