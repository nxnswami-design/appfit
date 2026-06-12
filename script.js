/* ==========================================
   FutureMind Fitness & Study Hub - JavaScript
   Main interactive functionality and API calls
   ========================================== */

// ==========================================
// API Configuration
// ==========================================

const API_BASE = 'http://localhost:5000/api';

// ==========================================
// Navigation & Page Management
// ==========================================

class NavigationManager {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.currentPage = this.getActivePage();
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        this.navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        e.target.classList.add('active');
      });
    });

    // Set active link on page load
    this.setActiveLink();
  }

  getActivePage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'home';
  }

  setActiveLink() {
    const activePage = this.getActivePage();
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `/${activePage}` || (activePage === '' && href === '/')) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize navigation on load
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
});

// ==========================================
// Study Page Functionality
// ==========================================

class StudyTimer {
  constructor() {
    this.timeRemaining = 0;
    this.isRunning = false;
    this.timerInterval = null;
    this.mode = 'pomodoro'; // pomodoro, deep_focus, custom
    this.customMinutes = 25;
    this.init();
  }

  init() {
    const startBtn = document.getElementById('study-start-btn');
    const pauseBtn = document.getElementById('study-pause-btn');
    const resetBtn = document.getElementById('study-reset-btn');
    const modeSelect = document.getElementById('study-mode');
    const customInput = document.getElementById('custom-study-time');

    if (startBtn) startBtn.addEventListener('click', () => this.start());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pause());
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    if (modeSelect) modeSelect.addEventListener('change', (e) => this.setMode(e.target.value));
    if (customInput) customInput.addEventListener('change', (e) => {
      this.customMinutes = parseInt(e.target.value) || 25;
      if (!this.isRunning) this.setMode('custom');
    });

    this.setMode('pomodoro');
    this.updateDisplay();
  }

  setMode(mode) {
    this.mode = mode;
    this.isRunning = false;
    clearInterval(this.timerInterval);

    switch (mode) {
      case 'pomodoro':
        this.timeRemaining = 25 * 60;
        break;
      case 'deep_focus':
        this.timeRemaining = 50 * 60;
        break;
      case 'custom':
        this.timeRemaining = this.customMinutes * 60;
        break;
    }

    this.updateDisplay();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateDisplay();
      } else {
        this.complete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  reset() {
    this.pause();
    this.setMode(this.mode);
  }

  complete() {
    this.pause();
    this.showNotification('Study Session Completed!', 'You completed a study session.');
    
    // Save session to backend
    const duration = this.mode === 'custom' ? this.customMinutes * 60 : 
                    this.mode === 'pomodoro' ? 25 * 60 : 50 * 60;
    
    fetch(`${API_BASE}/study/save-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration, mode: this.mode })
    }).catch(err => console.error('Error saving session:', err));

    this.setMode(this.mode);
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const display = document.getElementById('study-timer-display');
    
    if (display) {
      display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Update progress circle
    const totalSeconds = this.mode === 'custom' ? this.customMinutes * 60 :
                        this.mode === 'pomodoro' ? 25 * 60 : 50 * 60;
    const progress = ((totalSeconds - this.timeRemaining) / totalSeconds) * 100;
    const circle = document.querySelector('.timer-progress-circle');
    if (circle) {
      circle.style.background = `conic-gradient(#39FF14 ${progress}%, rgba(57, 255, 20, 0.1) ${progress}%)`;
    }
  }

  showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #1a1a1f;
      border: 2px solid #39FF14;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
      <div style="color: #e0e0e0; font-size: 0.9rem;">${message}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
}

// Load study stats
async function loadStudyStats() {
  try {
    const response = await fetch(`${API_BASE}/study/get-stats`);
    const stats = await response.json();

    document.getElementById('today-focus-time').textContent = `${stats.today_focus_time}`;
    document.getElementById('total-sessions').textContent = `${stats.total_sessions}`;
    document.getElementById('weekly-hours').textContent = `${stats.weekly_focus_hours}`;

  } catch (err) {
    console.error('Error loading study stats:', err);
  }
}

// ==========================================
// Fitness Page Functionality
// ==========================================

class FitnessTimer {
  constructor() {
    this.timeRemaining = 0;
    this.isRunning = false;
    this.timerInterval = null;
    this.difficulty = 'medium';
    this.muscleGroup = 'chest';
    this.sessionDuration = 30;
    this.init();
  }

  init() {
    const startBtn = document.getElementById('fitness-start-btn');
    const pauseBtn = document.getElementById('fitness-pause-btn');
    const resetBtn = document.getElementById('fitness-reset-btn');
    const difficultySelect = document.getElementById('difficulty-select');
    const muscleSelect = document.getElementById('muscle-select');

    if (startBtn) startBtn.addEventListener('click', () => this.start());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pause());
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    if (difficultySelect) difficultySelect.addEventListener('change', (e) => {
      this.difficulty = e.target.value;
    });
    if (muscleSelect) muscleSelect.addEventListener('change', (e) => {
      this.muscleGroup = e.target.value;
      this.loadExercises();
    });

    this.timeRemaining = this.sessionDuration * 60;
    this.updateDisplay();
    this.loadExercises();
  }

  loadExercises() {
    const exercises = this.getExercises(this.muscleGroup);
    const exerciseList = document.getElementById('exercise-list');

    if (exerciseList) {
      exerciseList.innerHTML = exercises.map(ex => `
        <div class="exercise-item">
          <span>${ex.name}</span>
          <span class="exercise-reps">${ex.reps}</span>
        </div>
      `).join('');
    }
  }

  getExercises(muscleGroup) {
    const exerciseDatabase = {
      chest: [
        { name: 'Push Ups', reps: '20' },
        { name: 'Incline Push Ups', reps: '15' },
        { name: 'Wide Push Ups', reps: '15' },
        { name: 'Dips', reps: '12' }
      ],
      back: [
        { name: 'Pull Ups', reps: '10' },
        { name: 'Superman Holds', reps: '30 sec' },
        { name: 'Rows', reps: '15' },
        { name: 'Reverse Flyes', reps: '12' }
      ],
      biceps: [
        { name: 'Bicep Curls', reps: '12' },
        { name: 'Hammer Curls', reps: '12' },
        { name: 'Concentration Curls', reps: '10' },
        { name: 'Barbell Curls', reps: '8' }
      ],
      triceps: [
        { name: 'Tricep Dips', reps: '12' },
        { name: 'Overhead Press', reps: '10' },
        { name: 'Rope Pushdowns', reps: '15' },
        { name: 'Close Grip Push Ups', reps: '15' }
      ],
      shoulders: [
        { name: 'Shoulder Press', reps: '10' },
        { name: 'Lateral Raises', reps: '12' },
        { name: 'Front Raises', reps: '12' },
        { name: 'Shrugs', reps: '15' }
      ],
      legs: [
        { name: 'Squats', reps: '15' },
        { name: 'Lunges', reps: '12 each' },
        { name: 'Leg Press', reps: '12' },
        { name: 'Calf Raises', reps: '20' }
      ],
      abs: [
        { name: 'Crunches', reps: '20' },
        { name: 'Planks', reps: '60 sec' },
        { name: 'Leg Raises', reps: '15' },
        { name: 'Russian Twists', reps: '20' }
      ],
      full_body: [
        { name: 'Burpees', reps: '10' },
        { name: 'Mountain Climbers', reps: '20' },
        { name: 'Jumping Jacks', reps: '30' },
        { name: 'High Knees', reps: '30 sec' }
      ]
    };

    return exerciseDatabase[muscleGroup] || exerciseDatabase.chest;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateDisplay();
      } else {
        this.complete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  reset() {
    this.pause();
    this.timeRemaining = this.sessionDuration * 60;
    this.updateDisplay();
  }

  complete() {
    this.pause();
    this.showNotification('Workout Complete!', 'Great job! You completed your workout.');
    
    // Save session to backend
    fetch(`${API_BASE}/fitness/save-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duration: this.sessionDuration * 60,
        muscle_group: this.muscleGroup,
        difficulty: this.difficulty
      })
    }).catch(err => console.error('Error saving session:', err));

    this.reset();
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const display = document.getElementById('fitness-timer-display');
    
    if (display) {
      display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Update progress
    const totalSeconds = this.sessionDuration * 60;
    const progress = ((totalSeconds - this.timeRemaining) / totalSeconds) * 100;
    const circle = document.querySelector('.fitness-progress-circle');
    if (circle) {
      circle.style.background = `conic-gradient(#39FF14 ${progress}%, rgba(57, 255, 20, 0.1) ${progress}%)`;
    }
  }

  showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #1a1a1f;
      border: 2px solid #39FF14;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
      <div style="color: #e0e0e0; font-size: 0.9rem;">${message}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
}

// Load fitness stats
async function loadFitnessStats() {
  try {
    const response = await fetch(`${API_BASE}/fitness/get-stats`);
    const stats = await response.json();

    document.getElementById('workouts-completed').textContent = `${stats.workouts_completed}`;
    document.getElementById('total-exercise-time').textContent = `${stats.total_exercise_time}`;
    document.getElementById('favorite-muscle').textContent = `${stats.favorite_muscle_group.replace('_', ' ').toUpperCase()}`;

  } catch (err) {
    console.error('Error loading fitness stats:', err);
  }
}

// ==========================================
// Shop Page Functionality
// ==========================================

class ShopManager {
  constructor() {
    this.init();
  }

  init() {
    const uploadBtn = document.getElementById('upload-product-btn');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => this.uploadProduct());
    }

    this.loadProducts();
  }

  async uploadProduct() {
    try {
      const name = document.getElementById('product-name').value;
      const link = document.getElementById('product-link').value;
      const description = document.getElementById('product-description').value;
      const imageFile = document.getElementById('product-image').files[0];

      if (!name || !link) {
        alert('Please fill in product name and link');
        return;
      }

      const formData = new FormData();
      formData.append('product_name', name);
      formData.append('product_link', link);
      formData.append('description', description);
      if (imageFile) {
        formData.append('product_image', imageFile);
      }

      const response = await fetch(`${API_BASE}/shop/upload-product`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        this.showNotification('Success!', 'Product uploaded successfully');
        document.getElementById('product-name').value = '';
        document.getElementById('product-link').value = '';
        document.getElementById('product-description').value = '';
        document.getElementById('product-image').value = '';
        this.loadProducts();
      } else {
        alert('Error uploading product: ' + result.message);
      }
    } catch (err) {
      console.error('Error uploading product:', err);
      alert('Error uploading product');
    }
  }

  async loadProducts() {
    try {
      const response = await fetch(`${API_BASE}/shop/get-products`);
      const products = await response.json();

      const container = document.getElementById('products-container');
      if (container) {
        if (products.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: #888;">No products uploaded yet</p>';
        } else {
          container.innerHTML = products.map(product => `
            <div class="product-card card">
              ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ''}
              <h3 class="card-title">${product.name}</h3>
              <p>${product.description}</p>
              <div style="display: flex; gap: 10px; margin-top: 15px;">
                <a href="${product.link}" target="_blank" class="btn btn-primary btn-small" style="flex: 1;">
                  Visit Product
                </a>
                <button onclick="shopManager.deleteProduct(${product.id})" class="btn btn-secondary btn-small">
                  Delete
                </button>
              </div>
            </div>
          `).join('');
        }
      }
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }

  async deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_BASE}/shop/delete-product/${productId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        this.showNotification('Deleted!', 'Product removed');
        this.loadProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }

  showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #1a1a1f;
      border: 2px solid #39FF14;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
      <div style="color: #e0e0e0; font-size: 0.9rem;">${message}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
}

let shopManager;

// ==========================================
// Profile Page Functionality
// ==========================================

class ProfileManager {
  constructor() {
    this.avatars = ['lion', 'deer', 'eagle', 'tiger', 'crocodile', 'tom', 'panther'];
    this.init();
  }

  init() {
    this.loadProfile();
    this.setupAvatarSelection();
  }

  setupAvatarSelection() {
    const container = document.getElementById('avatar-options');
    if (container) {
      container.innerHTML = this.avatars.map(avatar => `
        <div class="avatar-card card" data-avatar="${avatar}" onclick="profileManager.selectAvatar('${avatar}')">
          <div class="avatar-icon">
            ${this.getAvatarEmoji(avatar)}
          </div>
          <p style="margin-top: 10px; text-transform: capitalize;">${avatar}</p>
        </div>
      `).join('');
    }
  }

  getAvatarEmoji(avatar) {
    const emojis = {
      lion: '🦁',
      deer: '🦌',
      eagle: '🦅',
      tiger: '🐯',
      crocodile: '🐊',
      tom: '😺',
      panther: '🐆'
    };
    return emojis[avatar] || '🦁';
  }

  async selectAvatar(avatar) {
    try {
      const response = await fetch(`${API_BASE}/profile/update-avatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar })
      });

      const result = await response.json();

      if (result.success) {
        // Update UI
        document.querySelectorAll('.avatar-card').forEach(card => {
          card.classList.remove('selected');
        });
        document.querySelector(`[data-avatar="${avatar}"]`).classList.add('selected');

        this.loadProfile();
        this.showNotification('Avatar Updated!', `Selected ${avatar}`);
      }
    } catch (err) {
      console.error('Error updating avatar:', err);
    }
  }

  async loadProfile() {
    try {
      const response = await fetch(`${API_BASE}/profile/get-stats`);
      const stats = await response.json();

      // Update stats display
      document.getElementById('profile-avatar').innerHTML = this.getAvatarEmoji(stats.avatar);
      document.getElementById('profile-study-hours').textContent = `${stats.study_hours}`;
      document.getElementById('profile-fitness-sessions').textContent = `${stats.fitness_sessions}`;
      document.getElementById('profile-products').textContent = `${stats.products_uploaded}`;

      // Highlight selected avatar
      document.querySelectorAll('.avatar-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.avatar === stats.avatar) {
          card.classList.add('selected');
        }
      });
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  }

  showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #1a1a1f;
      border: 2px solid #39FF14;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
      <div style="color: #e0e0e0; font-size: 0.9rem;">${message}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
}

let profileManager;

// ==========================================
// Page Load Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes('/study')) {
    new StudyTimer();
    setTimeout(loadStudyStats, 100);
  } else if (currentPage.includes('/fitness')) {
    new FitnessTimer();
    setTimeout(loadFitnessStats, 100);
  } else if (currentPage.includes('/shop')) {
    shopManager = new ShopManager();
  } else if (currentPage.includes('/profile')) {
    profileManager = new ProfileManager();
  }
});

// ==========================================
// YouTube Search
// ==========================================

function performYoutubeSearch(searchId, type) {
  const searchInput = document.getElementById(searchId);
  if (searchInput.value.trim()) {
    const searchQuery = encodeURIComponent(searchInput.value);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, '_blank');
  } else {
    alert('Please enter a search query');
  }
}
