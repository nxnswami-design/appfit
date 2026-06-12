# FutureMind - Quick Start Guide ⚡

## 30-Second Setup

### Windows Users
1. Double-click `RUN.bat`
2. Wait for server to start
3. Open browser to `http://localhost:5000`

### Mac/Linux Users
1. Open terminal in project folder
2. Run: `bash RUN.sh`
3. Open browser to `http://localhost:5000`

## Manual Setup (If Scripts Don't Work)

### 1. Install Python (if not installed)
- Download from: https://www.python.org/downloads/
- Make sure to check "Add Python to PATH"

### 2. Open Terminal/Command Prompt
```bash
cd path/to/project
```

### 3. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Application
```bash
python app.py
```

### 6. Access in Browser
Visit: `http://localhost:5000`

## Features to Try First

### 📚 Study Page
- Click "25 Min Focus" button
- Click "Start Study" to begin timer
- Try the "YouTube Doubt Solver"
- Check your statistics

### 💪 Fitness Page
- Select "Chest" from muscle group dropdown
- See exercise list appear
- Click "Start Workout" to begin
- Check fitness statistics

### 🏪 Shop Page
- Upload a product image
- Fill in product details
- Click "Upload Product"
- See it appear in gallery

### 👤 Profile Page
- Click on different avatars
- Avatar changes instantly (saved automatically)
- View your statistics

## Common Issues

### "Port 5000 already in use"
Edit last lines of `app.py`:
```python
app.run(debug=True, port=5001)  # Change to different port
```

### "ModuleNotFoundError: No module named 'flask'"
Make sure you activated virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### "No module named 'werkzeug'"
Reinstall requirements:
```bash
pip install -r requirements.txt --upgrade
```

### Images not uploading
Create folder: `uploads/product_images/`

## Keyboard Shortcuts

- `Esc` - Focus back to page
- `Ctrl+Shift+I` - Open Developer Tools
- `Ctrl+R` - Refresh page
- `F11` - Full screen mode

## Tips & Tricks

✅ **All data saves automatically** - No need to manually save

✅ **Use Focus Timer for real study** - Get in the zone with Pomodoro technique

✅ **Try all muscle groups** - Find your favorite workout type

✅ **Share products you love** - Help community discover great tools

✅ **Check statistics regularly** - Track your progress and celebrate wins

## File Locations

- `app.py` - Server code
- `data.json` - Your saved data
- `templates/` - HTML pages
- `static/` - CSS and JavaScript
- `uploads/` - Uploaded product images

## Stop the Server

Press `Ctrl+C` in the terminal to stop the server safely.

## What's Next?

1. Customize colors in `static/style.css`
2. Add more avatars in `static/script.js`
3. Modify exercises in `static/script.js`
4. Change port number in `app.py`
5. Add new features (badges, challenges, etc.)

---

**Enjoy using FutureMind! 🚀**

Questions? Check README.md for detailed documentation.
