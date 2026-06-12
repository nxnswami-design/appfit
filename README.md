# FutureMind Fitness & Study Hub 🚀

A complete, production-ready full-stack website for managing study sessions and fitness workouts with community product sharing.

## Features ✨

### Study Page 📚
- Smart Study Timer (25min, 50min, or custom)
- YouTube Doubt Solver with embedded search
- Real-time study statistics
- Session tracking and analytics

### Fitness Page 💪
- Workout Timer with customizable durations
- 8 Muscle Groups: Chest, Back, Biceps, Triceps, Shoulders, Legs, Abs, Full Body
- 3 Difficulty Levels: Beginner, Intermediate, Advanced
- Pre-built exercise lists for each muscle group
- YouTube Fitness Video Search
- Workout statistics and tracking

### Community Shop 🏪
- Upload products with images
- Beautiful product gallery
- Direct product links
- Community sharing features
- Persistent storage

### Profile System 👤
- 6 Avatar Options (Lion, Deer, Eagle, Tiger, Crocodile, Black Panther)
- Personal statistics dashboard
- Profile customization
- Achievement system

### Design 🎨
- Modern futuristic UI with neon colors
- Glassmorphism effects
- Smooth animations
- Fully responsive (mobile, tablet, desktop)
- Dark theme optimized for eye comfort

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Backend**: Python Flask
- **Database**: JSON (file-based storage)
- **Server**: Flask Development Server

## Installation & Setup 🚀

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Clone/Download the Project
```bash
cd project
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

The application will be available at: **http://localhost:5000**

### Step 5: Open in Browser
Visit `http://localhost:5000` in your web browser

## Project Structure 📁

```
project/
├── app.py                          # Flask backend server
├── requirements.txt                # Python dependencies
├── data.json                       # User data & products (auto-created)
├── static/
│   ├── style.css                   # Main stylesheet
│   ├── script.js                   # Frontend JavaScript
│   └── images/                     # Optional: image assets
├── templates/
│   ├── home.html                   # Home/Landing page
│   ├── study.html                  # Study dashboard
│   ├── fitness.html                # Fitness dashboard
│   ├── shop.html                   # Community shop
│   └── profile.html                # User profile
├── uploads/
│   └── product_images/             # Uploaded product images
└── README.md                       # This file
```

## How to Use 📖

### Study Page
1. Go to Study section
2. Select timer mode (25min, 50min, or custom)
3. Click "Start Study" to begin session
4. Use "Pause" to take a break
5. "Reset" to start over
6. Search for doubts on YouTube using the Doubt Solver

### Fitness Page
1. Go to Fitness section
2. Select difficulty level (Beginner/Intermediate/Advanced)
3. Choose a muscle group from dropdown
4. View exercises for that muscle group
5. Click "Start Workout" to begin
6. Track your progress in statistics

### Shop Page
1. Fill in product details (name, link, description)
2. Upload product image
3. Click "Upload Product"
4. Products persist and are displayed in gallery
5. Other users can click "Visit Product" to go to the link

### Profile Page
1. View current avatar
2. Click on any avatar to change it (saved automatically)
3. Check your personal statistics
4. View achievements and tips

## API Endpoints 🔌

### GET Endpoints
- `GET /` - Home page
- `GET /study` - Study dashboard
- `GET /fitness` - Fitness dashboard
- `GET /shop` - Community shop
- `GET /profile` - User profile
- `GET /api/get-user-data` - Fetch user data
- `GET /api/get-products` - Fetch all products

### POST Endpoints
- `POST /api/save-study-session` - Save study session
- `POST /api/save-workout-session` - Save workout session
- `POST /api/set-avatar` - Change avatar
- `POST /api/upload-product` - Upload product

### DELETE Endpoints
- `DELETE /api/delete-product/<id>` - Delete product

## Data Storage 💾

All data is stored in `data.json` with the following structure:

```json
{
  "users": {
    "default": {
      "avatar": "lion",
      "study_hours": 0,
      "fitness_sessions": 0,
      "products_uploaded": 0,
      "study_sessions": [],
      "workout_sessions": []
    }
  },
  "products": []
}
```

Data persists automatically and survives:
- Browser refresh
- Browser close
- Computer restart
- Multiple sessions

## Color Palette 🎨

- **Primary**: #ff2d95 (Neon Pink)
- **Secondary**: #8a2be2 (Electric Purple)
- **Accent**: #00bfff (Neon Blue)
- **Dark Background**: #0a0a0f (Almost Black)
- **Text Primary**: #ffffff (White)
- **Text Secondary**: #b0b0b0 (Gray)

## Features Included ✅

- ✅ 5 Complete Pages (Home, Study, Fitness, Shop, Profile)
- ✅ Sticky Navigation Bar
- ✅ Study Timer with Multiple Modes
- ✅ Fitness Tracker with Exercise Database
- ✅ YouTube Integration (Doubt Solver & Fitness Search)
- ✅ Product Upload & Gallery
- ✅ Avatar Selection System
- ✅ Statistics & Analytics
- ✅ Persistent Data Storage
- ✅ Responsive Mobile Design
- ✅ Beautiful Animations
- ✅ Modern UI/UX
- ✅ Clean Code with Comments
- ✅ Full-Stack Implementation

## Troubleshooting 🔧

### Port Already in Use
If port 5000 is already in use, modify `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change port number
```

### Image Upload Issues
Ensure `uploads/product_images/` folder exists with write permissions.

### Data Not Saving
Check if `data.json` exists in the project root. It's created automatically on first run.

### Static Files Not Loading
Ensure you're accessing via `http://localhost:5000`, not file path.

## Customization 🎯

### Change Colors
Edit CSS variables in `static/style.css`:
```css
:root {
    --primary: #ff2d95;
    --secondary: #8a2be2;
    /* etc */
}
```

### Add More Avatars
Edit `avatarData` in `static/script.js` and add avatar emoji.

### Modify Exercises
Edit `exercises` object in `static/script.js` for different exercise lists.

## Performance Tips ⚡

- Minimize browser tabs for better performance
- Clear browser cache if experiencing issues
- Use modern browsers (Chrome, Firefox, Safari, Edge)
- For faster uploads, use optimized images (< 2MB)

## Browser Support 🌐

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements 🚀

- User authentication system
- Cloud sync (Firebase/Supabase)
- Social features (Friends, Leaderboards)
- Advanced analytics dashboard
- Mobile app version
- AI workout recommendations

## License 📝

This project is open source and available for personal use.

## Support 💬

For issues or questions, check:
1. Ensure Python 3.8+ is installed
2. All dependencies are installed: `pip install -r requirements.txt`
3. Flask is running on correct port
4. Browser cache is cleared

## Credits ✨

Created with ❤️ for students and fitness enthusiasts worldwide.

---

**Happy studying and working out! 💪📚**
# appfit
