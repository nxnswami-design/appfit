#!/bin/bash

# FutureMind Fitness & Study Hub - Run Script
# This script sets up and runs the application

echo "================================"
echo "FutureMind Fitness & Study Hub"
echo "================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🚀 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Run the application
echo ""
echo "================================"
echo "✨ Starting FutureMind Server..."
echo "================================"
echo ""
echo "🌐 Open your browser and visit:"
echo "   http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 app.py
