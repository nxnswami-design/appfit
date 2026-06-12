@echo off
echo ================================
echo FutureMind Fitness and Study Hub
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

echo Python found

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt

REM Run the application
echo.
echo ================================
echo Starting FutureMind Server...
echo ================================
echo.
echo Open your browser and visit:
echo http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py
pause
