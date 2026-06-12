# FutureMind - Complete File Structure & Descriptions 📁

## Project Directory Tree

```
project/
├── 📄 app.py                              # Main Flask backend server
├── 📄 requirements.txt                    # Python dependencies
├── 📄 data.json                           # User data & products (auto-created)
├── 📄 README.md                           # Main documentation
├── 📄 QUICKSTART.md                       # Quick start guide
├── 📄 TECHNICAL.md                        # Technical documentation
├── 📄 FILE_STRUCTURE.md                   # This file
├── 📄 RUN.sh                              # Linux/Mac startup script
├── 📄 RUN.bat                             # Windows startup script
│
├── 📁 static/                             # Frontend assets
│   ├── 📄 style.css                       # Main stylesheet
│   ├── 📄 script.js                       # Frontend JavaScript
│   └── 📁 images/                         # Optional image assets
│
├── 📁 templates/                          # HTML pages
│   ├── 📄 home.html                       # Home/Landing page
│   ├── 📄 study.html                      # Study dashboard
│   ├── 📄 fitness.html                    # Fitness dashboard
│   ├── 📄 shop.html                       # Community shop
│   └── 📄 profile.html                    # User profile
│
└── 📁 uploads/                            # User generated content
    └── 📁 product_images/                 # Product images
```

## File Descriptions

### Root Directory Files

#### `app.py` 🐍
**Type:** Python / Flask Server
**Size:** ~8KB
**Purpose:** Main backend server handling all API routes and data persistence
**Key Functions:**
- Initialize Flask application
- Define route handlers (/, /study, /fitness, /shop, /profile)
- API endpoints for data operations
- File upload handling
- JSON data persistence

**Dependencies:** Flask, Werkzeug

#### `requirements.txt` 📋
**Type:** Dependency List
**Purpose:** Lists all Python packages needed to run the project
**Content:**
```
Flask==3.0.0
Werkzeug==3.0.1
```

#### `data.json` 💾
**Type:** JSON Data Store
**Auto-created:** Yes (on first run)
**Purpose:** Persistent storage for all user data
**Contains:**
- User profile (avatar, statistics)
- Study sessions history
- Workout sessions history
- Uploaded products

#### `README.md` 📖
**Type:** Markdown Documentation
**Size:** ~10KB
**Purpose:** Complete project documentation
**Includes:**
- Feature list
- Installation instructions
- Project structure
- API endpoints
- Troubleshooting
- Browser support

#### `QUICKSTART.md` ⚡
**Type:** Markdown Guide
**Size:** ~4KB
**Purpose:** Fast setup for impatient users
**Includes:**
- 30-second setup
- Manual setup steps
- Features to try first
- Common issues
- Keyboard shortcuts

#### `TECHNICAL.md` 🔧
**Type:** Technical Reference
**Size:** ~12KB
**Purpose:** Deep dive into architecture and code
**Includes:**
- Architecture diagram
- Code structure
- API specification
- Development guide
- Performance tips
- Deployment options

#### `FILE_STRUCTURE.md` 📁
**Type:** This File
**Purpose:** Complete file inventory and descriptions

#### `RUN.sh` 🚀
**Type:** Bash Shell Script
**Purpose:** Automated startup for Mac/Linux
**Does:**
- Checks Python installation
- Creates virtual environment
- Installs dependencies
- Starts Flask server

#### `RUN.bat` 🚀
**Type:** Batch Script
**Purpose:** Automated startup for Windows
**Does:**
- Checks Python installation
- Creates virtual environment
- Installs dependencies
- Starts Flask server

---

## Static Assets Directory

### `static/style.css` 🎨
**Type:** CSS Stylesheet
**Size:** ~15KB
**Purpose:** All visual styling and animations
**Sections:**
- CSS Variables (colors, sizes)
- Responsive grid layout
- Card components
- Timer display styling
- Form inputs
- Avatar grid
- Product gallery
- Footer
- Mobile responsive
- Animations (float, slideIn, spin)

**Key Classes:**
- `.navbar` - Navigation bar styling
- `.card` - Card component
- `.btn` - Button styles
- `.timer-display` - Large timer text
- `.stats-grid` - Statistics layout
- `.avatar-grid` - Avatar selection

### `static/script.js` 📜
**Type:** JavaScript (ES6+)
**Size:** ~18KB
**Purpose:** All frontend interactivity and logic
**Sections:**
- Global state management
- Notification system
- Navigation highlighting
- User data loading
- Exercise database
- Avatar definitions
- Study page functions
- Fitness page functions
- Shop page functions
- Profile page functions

**Key Functions:**
- `initStudyPage()` - Initialize study timer
- `initFitnessPage()` - Initialize fitness timer
- `initShopPage()` - Initialize product upload
- `initProfilePage()` - Initialize profile
- `loadUserData()` - Fetch user profile
- `loadProducts()` - Fetch products
- `showNotification()` - Display toast notifications

### `static/images/` 📸
**Type:** Image Assets Directory
**Purpose:** Optional folder for static images
**Use:** Store logos, icons, backgrounds (unused in current version)

---

## Templates Directory

### `templates/home.html` 🏠
**Type:** HTML Page
**Size:** ~8KB
**Purpose:** Landing page and home section
**Sections:**
- Navigation bar
- Hero section with CTA buttons
- Features grid (6 feature cards)
- Why choose us section (6 cards)
- Image gallery (4 images from Unsplash)
- Footer with social links

**Key Elements:**
- `hero-title` - Large headline
- `cards-grid` - Feature showcase
- Footer with links

### `templates/study.html` 📚
**Type:** HTML Page
**Size:** ~7KB
**Purpose:** Study dashboard
**Sections:**
- Header with title
- Focus Timer section
  - Timer display (MM:SS)
  - Mode selection (25/50/custom)
  - Control buttons (start/pause/reset)
- YouTube Doubt Solver
  - Search input
  - Search button
- Study Statistics
  - Today's focus time
  - Total sessions
  - Weekly hours
- Study Tips (6 tip cards)

**Key Elements:**
- `timer-display` - Large countdown
- `timer-modes` - Mode buttons
- `timer-controls` - Action buttons
- `stats-grid` - Statistics display

### `templates/fitness.html` 💪
**Type:** HTML Page
**Size:** ~9KB
**Purpose:** Fitness dashboard
**Sections:**
- Header with title
- Workout Timer section
  - Timer display (MM:SS)
  - Control buttons
- Difficulty Selector dropdown
- Muscle Group Selector
  - 8 muscle groups
  - Dynamic exercise list
- YouTube Fitness Search
- Workout Statistics
  - Workouts completed
  - Total exercise time
  - Favorite muscle group
- Fitness Tips (6 cards)
- Muscle Groups Training Days (6 cards)

**Key Elements:**
- `fitnessTimerDisplay` - Countdown
- `muscleSelector` - Dropdown menu
- `exerciseList` - Dynamic content
- `difficultySelector` - Difficulty level

### `templates/shop.html` 🏪
**Type:** HTML Page
**Size:** ~8KB
**Purpose:** Community marketplace
**Sections:**
- Header with title
- Upload Product Form
  - Product name input
  - Product image upload
  - Product link input
  - Description textarea
  - Submit button
- Product Gallery
  - Grid of product cards
  - Each card: image, name, description, buttons
- Popular Categories (6 cards)
- Shopping Tips (6 cards)

**Key Elements:**
- `uploadForm` - Form with file input
- `productGallery` - Dynamic product list
- `productCard` - Product display card

### `templates/profile.html` 👤
**Type:** HTML Page
**Size:** ~9KB
**Purpose:** User profile page
**Sections:**
- Header with title
- Current Avatar Display
- Avatar Selection Grid
  - 6 selectable avatars
  - Click to change
- Profile Statistics
  - Study hours
  - Fitness sessions
  - Products shared
- Profile Information
  - About section
  - Achievements grid (4 achievements)
- Settings & Privacy (6 cards)
- Quick Tips (6 cards)

**Key Elements:**
- `avatarGrid` - Avatar selection
- `selectedAvatar` - Current avatar display
- `stats-grid` - Statistics cards

---

## Uploads Directory

### `uploads/product_images/` 📸
**Type:** Directory for User Uploads
**Purpose:** Store product images uploaded by users
**Auto-created:** Yes (if doesn't exist)
**File Types:** PNG, JPG, JPEG, GIF, WebP
**Max Size:** 16MB per file
**Organization:** Automatically prefixed with timestamp

**Example Files:**
```
20240115_143045_product1.jpg
20240115_145230_product2.png
```

---

## File Statistics

| Category | Count | Total Size |
|----------|-------|-----------|
| Python Files | 1 | ~8KB |
| HTML Templates | 5 | ~40KB |
| CSS Stylesheets | 1 | ~15KB |
| JavaScript Files | 1 | ~18KB |
| Config Files | 3 | ~2KB |
| Documentation | 4 | ~40KB |
| Scripts | 2 | ~4KB |
| **Total** | **17** | **~127KB** |

*Excluding user-generated uploads*

---

## File Modification Guide

### To Modify:

**Colors**
- File: `static/style.css`
- Section: `:root` variables

**Exercise List**
- File: `static/script.js`
- Section: `const exercises = {}`

**Avatars**
- File: `static/script.js`
- Section: `const avatarData = []`

**Page Content**
- Files: `templates/*.html`
- Update HTML as needed

**Server Port**
- File: `app.py`
- Line: `app.run(debug=True, port=5000)`

**API Routes**
- File: `app.py`
- Add new `@app.route()` functions

---

## Loading Order

### On First Visit:
1. `app.py` starts Flask server
2. Browser requests `home.html` from `/` route
3. `home.html` loads stylesheet (`style.css`)
4. `home.html` loads script (`script.js`)
5. JavaScript initializes and loads data via API
6. Navigation is set up
7. Page is fully interactive

### When Navigating:
1. Click navigation link (e.g., `/study`)
2. Flask routes to corresponding `.html` template
3. Page-specific JavaScript initializes
4. Data is fetched from backend via API
5. Page displays with current user data

---

## Backup & Export

### Important Files to Backup
- `data.json` - Contains all user data ⭐⭐⭐
- `templates/*.html` - Custom content
- `uploads/product_images/` - Uploaded images

### How to Export Data
1. Download `data.json`
2. Keep safe backup copy
3. Can be imported into future versions

---

## Version Information

**Current Version:** 1.0.0
**Created:** 2024
**Python Version:** 3.8+
**Flask Version:** 3.0.0
**Browser Support:** All modern browsers

---

## File Permissions

| File | Read | Write | Execute |
|------|------|-------|---------|
| `app.py` | ✅ | ❌ | ✅ |
| `data.json` | ✅ | ✅ | ❌ |
| `templates/*.html` | ✅ | ❌ | ❌ |
| `static/*.css` | ✅ | ❌ | ❌ |
| `static/*.js` | ✅ | ❌ | ❌ |
| `uploads/` | ✅ | ✅ | ❌ |

---

For more information, see README.md or TECHNICAL.md
