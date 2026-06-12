"""
FutureMind Fitness & Study Hub - Flask Backend
Main application file with API routes and database management
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from werkzeug.utils import secure_filename
import shutil

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads', 'product_images')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Data storage file
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data.json')

# Initialize data structure
DEFAULT_DATA = {
    'user_profile': {
        'avatar': 'lion',
        'study_hours': 0,
        'fitness_sessions': 0,
        'products_uploaded': 0
    },
    'study_sessions': [],
    'fitness_sessions': [],
    'products': []
}

def load_data():
    """Load data from JSON file"""
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
    except:
        pass
    return DEFAULT_DATA.copy()

def save_data(data):
    """Save data to JSON file"""
    try:
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except:
        return False

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ========================
# ROUTES - Pages
# ========================

@app.route('/')
def home():
    """Home page"""
    return render_template('home.html')

@app.route('/study')
def study():
    """Study page"""
    return render_template('study.html')

@app.route('/fitness')
def fitness():
    """Fitness page"""
    return render_template('fitness.html')

@app.route('/shop')
def shop():
    """Shop page"""
    return render_template('shop.html')

@app.route('/profile')
def profile():
    """Profile page"""
    return render_template('profile.html')

# ========================
# API ROUTES - Study
# ========================

@app.route('/api/study/save-session', methods=['POST'])
def save_study_session():
    """Save study session data"""
    try:
        data = load_data()
        session_data = request.json
        
        data['study_sessions'].append({
            'duration': session_data.get('duration', 0),
            'mode': session_data.get('mode', 'custom'),
            'timestamp': datetime.now().isoformat(),
            'date': datetime.now().strftime('%Y-%m-%d')
        })
        
        # Update total study hours
        total_seconds = sum(session['duration'] for session in data['study_sessions'])
        data['user_profile']['study_hours'] = round(total_seconds / 3600, 1)
        
        save_data(data)
        return jsonify({'success': True, 'message': 'Session saved'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@app.route('/api/study/get-stats', methods=['GET'])
def get_study_stats():
    """Get study statistics"""
    try:
        data = load_data()
        sessions = data['study_sessions']
        
        today = datetime.now().strftime('%Y-%m-%d')
        today_sessions = [s for s in sessions if s.get('date') == today]
        today_time = sum(s['duration'] for s in today_sessions)
        
        # Calculate weekly stats
        from datetime import timedelta
        week_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
        week_sessions = [s for s in sessions if s.get('date') >= week_ago]
        week_time = sum(s['duration'] for s in week_sessions)
        
        stats = {
            'today_focus_time': round(today_time / 60, 1),  # Convert to minutes
            'total_sessions': len(sessions),
            'weekly_focus_hours': round(week_time / 3600, 1),
            'total_study_hours': data['user_profile']['study_hours']
        }
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ========================
# API ROUTES - Fitness
# ========================

@app.route('/api/fitness/save-session', methods=['POST'])
def save_fitness_session():
    """Save fitness session data"""
    try:
        data = load_data()
        session_data = request.json
        
        data['fitness_sessions'].append({
            'duration': session_data.get('duration', 0),
            'muscle_group': session_data.get('muscle_group', 'full_body'),
            'difficulty': session_data.get('difficulty', 'medium'),
            'timestamp': datetime.now().isoformat(),
            'date': datetime.now().strftime('%Y-%m-%d')
        })
        
        # Update fitness sessions count
        data['user_profile']['fitness_sessions'] = len(data['fitness_sessions'])
        
        save_data(data)
        return jsonify({'success': True, 'message': 'Workout saved'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@app.route('/api/fitness/get-stats', methods=['GET'])
def get_fitness_stats():
    """Get fitness statistics"""
    try:
        data = load_data()
        sessions = data['fitness_sessions']
        
        total_time = sum(s['duration'] for s in sessions)
        
        # Find favorite muscle group
        muscle_groups = {}
        for session in sessions:
            muscle = session.get('muscle_group', 'full_body')
            muscle_groups[muscle] = muscle_groups.get(muscle, 0) + 1
        
        favorite_muscle = max(muscle_groups, key=muscle_groups.get) if muscle_groups else 'full_body'
        
        stats = {
            'workouts_completed': len(sessions),
            'total_exercise_time': round(total_time / 60, 1),  # in minutes
            'favorite_muscle_group': favorite_muscle,
            'total_fitness_sessions': data['user_profile']['fitness_sessions']
        }
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ========================
# API ROUTES - Shop
# ========================

@app.route('/api/shop/upload-product', methods=['POST'])
def upload_product():
    """Upload product to shop"""
    try:
        data = load_data()
        product_name = request.form.get('product_name', '')
        product_link = request.form.get('product_link', '')
        description = request.form.get('description', '')
        
        product_image_url = ''
        
        # Handle image upload
        if 'product_image' in request.files:
            file = request.files['product_image']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product_image_url = f"/uploads/product_images/{filename}"
        
        product = {
            'id': datetime.now().timestamp(),
            'name': product_name,
            'link': product_link,
            'description': description,
            'image': product_image_url,
            'uploaded_at': datetime.now().isoformat()
        }
        
        data['products'].append(product)
        data['user_profile']['products_uploaded'] = len(data['products'])
        
        save_data(data)
        return jsonify({'success': True, 'message': 'Product uploaded', 'product': product})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@app.route('/api/shop/get-products', methods=['GET'])
def get_products():
    """Get all products"""
    try:
        data = load_data()
        return jsonify(data['products'])
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/shop/delete-product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product"""
    try:
        data = load_data()
        product_id = float(product_id)
        
        # Find and delete product
        data['products'] = [p for p in data['products'] if p['id'] != product_id]
        data['user_profile']['products_uploaded'] = len(data['products'])
        
        save_data(data)
        return jsonify({'success': True, 'message': 'Product deleted'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

# ========================
# API ROUTES - Profile
# ========================

@app.route('/api/profile/get-profile', methods=['GET'])
def get_profile():
    """Get user profile data"""
    try:
        data = load_data()
        return jsonify(data['user_profile'])
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/profile/update-avatar', methods=['POST'])
def update_avatar():
    """Update user avatar"""
    try:
        data = load_data()
        avatar = request.json.get('avatar', 'lion')
        data['user_profile']['avatar'] = avatar
        save_data(data)
        return jsonify({'success': True, 'message': 'Avatar updated'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@app.route('/api/profile/get-stats', methods=['GET'])
def get_all_stats():
    """Get all user statistics"""
    try:
        data = load_data()
        profile = data['user_profile']
        
        stats = {
            'avatar': profile['avatar'],
            'study_hours': profile['study_hours'],
            'fitness_sessions': profile['fitness_sessions'],
            'products_uploaded': profile['products_uploaded']
        }
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ========================
# File serving
# ========================

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], '..'), filename)

# ========================
# Error handlers
# ========================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Server error'}), 500

# ========================
# Run application
# ========================

if __name__ == '__main__':
    # Use PORT environment variable provided by Render, defaulting to 5000 locally
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
