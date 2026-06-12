# FutureMind - Technical Documentation 🔧

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│         Frontend (HTML, CSS, JavaScript)         │
│  ┌────────┐  ┌────────┐  ┌──────────────────┐  │
│  │  Home  │  │ Study  │  │ Fitness | Shop   │  │
│  └────────┘  └────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │         JavaScript Event Handlers         │  │
│  │    (Timers, Forms, API Calls, Storage)   │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
              ↓ HTTP Requests ↓
┌─────────────────────────────────────────────────┐
│    Backend (Flask + Python)                     │
│  ┌──────────────────────────────────────────┐  │
│  │       Route Handlers (/api/*)            │  │
│  │  - Study Session Management             │  │
│  │  - Workout Session Management           │  │
│  │  - Product Upload Handler               │  │
│  │  - Avatar Management                    │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │      Data Persistence Layer              │  │
│  │  (JSON File I/O Operations)              │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
              ↓ Read/Write ↓
┌─────────────────────────────────────────────────┐
│    Data Storage (data.json + File System)       │
│  ┌──────────────────────────────────────────┐  │
│  │      User Data (Avatar, Statistics)      │  │
│  │      Product Data (Metadata, Images)     │  │
│  │      Session History (Study/Fitness)     │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Frontend Code Structure

### HTML Templates (`templates/`)

#### home.html
- Hero section with CTAs
- Feature cards grid
- Why choose us section
- Image gallery
- Footer

#### study.html
- Study timer display (MM:SS format)
- Mode selection buttons (25/50/custom)
- Progress circle visualization
- YouTube doubt solver
- Statistics cards

#### fitness.html
- Fitness timer display
- Difficulty selector dropdown
- Muscle group selector dropdown
- Dynamic exercise list
- YouTube fitness search
- Workout statistics

#### shop.html
- Product upload form with image input
- Dynamic product gallery
- Product cards with delete button
- Shopping categories
- Marketplace features

#### profile.html
- Avatar display card
- Avatar selection grid
- User statistics dashboard
- Achievement showcase
- Settings & privacy section

### CSS (`static/style.css`)

**Key Variables:**
```css
:root {
    --primary: #ff2d95;        /* Neon Pink */
    --secondary: #8a2be2;      /* Purple */
    --accent: #00bfff;         /* Neon Blue */
    --dark-bg: #0a0a0f;        /* Dark Background */
    --card-bg: rgba(...);      /* Semi-transparent cards */
    --border-color: rgba(...); /* Subtle borders */
}
```

**Component Classes:**
- `.navbar` - Sticky navigation bar
- `.container` - Max-width wrapper
- `.card` - Glass effect cards
- `.btn` - Button styles (primary/secondary)
- `.timer-display` - Large timer text
- `.stats-grid` - Statistics layout
- `.avatar-grid` - Avatar selection layout
- `.product-card` - Product gallery items

**Animations:**
- `float` - Floating image animation
- `slideIn` - Content reveal
- `spin` - Loading spinner
- `slideInUp` - Notification popup

### JavaScript (`static/script.js`)

**Global State Object:**
```javascript
const state = {
    studyTimer: null,        // Interval ID
    studyTime: 0,           // Elapsed seconds
    studyDuration: 0,       // Total duration
    fitnessTimer: null,     // Interval ID
    fitnessTime: 0,         // Elapsed seconds
    fitnessDuration: 0,     // Total duration
    currentExercises: [],   // Active exercise list
    selectedAvatar: 'lion'  // Current avatar
};
```

**Key Functions:**

1. **Timer Management**
   - `initStudyPage()` - Study timer setup
   - `updateTimerDisplay(element, current, total)` - Update UI
   - `initFitnessPage()` - Fitness timer setup
   - `saveStudySession(duration)` - Persist data
   - `saveFitnessSession(duration)` - Persist data

2. **Data Fetching**
   - `loadUserData()` - GET user profile
   - `loadStudyStats()` - Fetch study statistics
   - `loadFitnessStats()` - Fetch workout statistics
   - `loadProducts()` - GET product gallery
   - `loadProfileStats()` - Load profile data

3. **User Interactions**
   - `displayExercises(container, list)` - Show exercise list
   - `deleteProduct(id)` - DELETE product
   - `setActiveNav()` - Highlight current page

4. **Notifications**
   - `showNotification(message, type)` - Display toast

**Exercise Database:**
```javascript
const exercises = {
    chest: [{name, reps}, ...],
    back: [...],
    biceps: [...],
    triceps: [...],
    shoulders: [...],
    legs: [...],
    abs: [...],
    fullbody: [...]
};
```

**Avatar Data:**
```javascript
const avatarData = [
    {name: 'lion', emoji: '🦁'},
    {name: 'deer', emoji: '🦌'},
    // ... 6 total
];
```

## Backend Code Structure

### Flask Application (`app.py`)

**Configuration:**
```python
UPLOAD_FOLDER = 'uploads/product_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
DATA_FILE = 'data.json'
```

**Core Functions:**

1. **Data Persistence**
   ```python
   init_data_file()      # Initialize data.json
   load_data()           # Read from JSON
   save_data(data)       # Write to JSON
   allowed_file(filename) # Validate uploads
   ```

2. **Routes (Pages)**
   ```python
   @app.route('/')          # Home
   @app.route('/study')     # Study dashboard
   @app.route('/fitness')   # Fitness dashboard
   @app.route('/shop')      # Shop/marketplace
   @app.route('/profile')   # User profile
   ```

3. **API Endpoints**
   ```python
   POST /api/save-study-session
   POST /api/save-workout-session
   POST /api/set-avatar
   POST /api/upload-product
   GET  /api/get-user-data
   GET  /api/get-products
   DELETE /api/delete-product/<id>
   ```

### Data Schema (`data.json`)

```json
{
  "users": {
    "default": {
      "avatar": "lion",
      "study_hours": 45.5,
      "fitness_sessions": 12,
      "products_uploaded": 3,
      "study_sessions": [
        {
          "duration": 25,
          "mode": "study",
          "timestamp": "2024-01-15T14:30:00"
        }
      ],
      "workout_sessions": [
        {
          "muscle_group": "chest",
          "difficulty": "intermediate",
          "duration": 30,
          "timestamp": "2024-01-15T10:00:00"
        }
      ]
    }
  },
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "link": "https://example.com",
      "description": "Product description",
      "image": "/uploads/product_images/filename.jpg",
      "timestamp": "2024-01-15T14:30:00"
    }
  ]
}
```

## API Specification

### Authentication
Currently no authentication. Single user per device.

### Request/Response Format

**Save Study Session**
```
POST /api/save-study-session
Content-Type: application/json

{
  "duration": 25,
  "mode": "study"
}

Response: {
  "status": "success",
  "message": "Study session saved"
}
```

**Get User Data**
```
GET /api/get-user-data

Response: {
  "avatar": "lion",
  "study_hours": 45.5,
  "fitness_sessions": 12,
  "products_uploaded": 3,
  "study_sessions": [...],
  "workout_sessions": [...]
}
```

**Upload Product**
```
POST /api/upload-product
Content-Type: multipart/form-data

Form Data:
- name (text)
- link (url)
- description (text)
- image (file)

Response: {
  "status": "success",
  "product": {
    "id": 1,
    "name": "...",
    "link": "...",
    "description": "...",
    "image": "/uploads/...",
    "timestamp": "..."
  }
}
```

## Development Guide

### Adding a New Feature

1. **Add HTML (template)**
   ```html
   <div class="new-feature">
     <input id="featureInput" type="text">
     <button id="featureBtn">Action</button>
   </div>
   ```

2. **Add CSS (style.css)**
   ```css
   .new-feature {
     /* styles */
   }
   ```

3. **Add JavaScript Handler (script.js)**
   ```javascript
   const btn = document.getElementById('featureBtn');
   btn.addEventListener('click', () => {
     // functionality
   });
   ```

4. **Add Backend Route (app.py)**
   ```python
   @app.route('/api/feature', methods=['POST'])
   def handle_feature():
       data = request.json
       # Process data
       return jsonify({'status': 'success'})
   ```

### Modifying Exercises

Edit `exercises` object in `script.js`:
```javascript
const exercises = {
    newmuscle: [
        {name: 'Exercise 1', reps: 12},
        {name: 'Exercise 2', reps: '30 sec'}
    ]
};
```

### Adding Avatars

1. Add emoji to `avatarData` in `script.js`:
   ```javascript
   {name: 'newavatar', emoji: '🦁'}
   ```

2. Add option to dropdown (if needed)

### Changing Colors

Edit `:root` variables in `style.css`:
```css
:root {
    --primary: #YOUR_COLOR;
}
```

## Performance Optimization

**Frontend:**
- Minimal dependencies (no frameworks)
- Single-page app for smooth transitions
- CSS animations use GPU acceleration
- Event delegation for large lists

**Backend:**
- JSON for simple, fast storage
- No database overhead
- Minimal I/O operations
- Direct file streaming for images

## Security Considerations

1. **File Upload Validation**
   - File type checking (ALLOWED_EXTENSIONS)
   - File size limit (16MB)
   - Secure filename generation

2. **Data Isolation**
   - Single user per device
   - No cross-user data leaking
   - Local storage only

3. **Input Validation**
   - Form validation on frontend
   - Content-type checking on backend

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- Mobile browsers: Full support

## Deployment Options

### Local Only
- No deployment needed
- Data stays on device

### Self-Hosted (VPS)
1. Install Python on server
2. Upload files via SFTP
3. Run with production WSGI (Gunicorn)
4. Add reverse proxy (Nginx)

### Cloud Deployment (Heroku/Replit)
1. Push code to git
2. Configure `Procfile`
3. Deploy with cloud provider

### Docker
```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

## Debugging

### Enable Debug Mode
In browser console:
```javascript
// Check current state
console.log(state);

// Fetch user data
fetch('/api/get-user-data')
  .then(r => r.json())
  .then(console.log);
```

### Flask Debug Logs
Already enabled in `app.py` with `debug=True`

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Timer not starting | Check browser console for JS errors |
| Images not uploading | Verify folder permissions |
| Data not persisting | Check data.json file exists |
| Styles not applying | Clear browser cache (Ctrl+Shift+Del) |

## Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Timers start, pause, reset
- [ ] Data saves to data.json
- [ ] Product upload works
- [ ] Images display correctly
- [ ] Avatar selection saves
- [ ] Statistics update correctly
- [ ] Navigation works smoothly
- [ ] Mobile responsive works
- [ ] All YouTube links work

## Future Enhancements

1. Database (PostgreSQL/MongoDB)
2. User authentication (JWT)
3. Cloud storage (AWS S3)
4. Real-time notifications
5. Social features
6. Mobile app
7. Progressive Web App (PWA)
8. Advanced analytics

---

For more information, see README.md and QUICKSTART.md
