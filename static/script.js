// Global state
const state = {
    studyTimer: null,
    studyTime: 0,
    studyDuration: 0,
    fitnessTimer: null,
    fitnessTime: 0,
    fitnessDuration: 0,
    currentExercises: [],
    selectedAvatar: 'lion'
};

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Set active nav link
function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load user data
async function loadUserData() {
    try {
        const response = await fetch('/api/get-user-data');
        const userData = await response.json();
        state.selectedAvatar = userData.avatar || 'lion';
        return userData;
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Exercise Database
const exercises = {
    chest: [
        { name: 'Push Ups', reps: 20 },
        { name: 'Incline Push Ups', reps: 15 },
        { name: 'Wide Push Ups', reps: 15 },
        { name: 'Dips', reps: 12 }
    ],
    back: [
        { name: 'Pull Ups', reps: 10 },
        { name: 'Superman Holds', reps: '30 sec' },
        { name: 'Rows', reps: 15 },
        { name: 'Reverse Fly', reps: 12 }
    ],
    biceps: [
        { name: 'Barbell Curls', reps: 12 },
        { name: 'Dumbbell Curls', reps: 12 },
        { name: 'Hammer Curls', reps: 12 },
        { name: 'Concentration Curls', reps: 10 }
    ],
    triceps: [
        { name: 'Tricep Dips', reps: 12 },
        { name: 'Rope Push Downs', reps: 15 },
        { name: 'Skull Crushers', reps: 12 },
        { name: 'Close Grip Press', reps: 10 }
    ],
    shoulders: [
        { name: 'Military Press', reps: 10 },
        { name: 'Lateral Raises', reps: 15 },
        { name: 'Shoulder Shrugs', reps: 15 },
        { name: 'Reverse Flys', reps: 12 }
    ],
    legs: [
        { name: 'Squats', reps: 20 },
        { name: 'Lunges', reps: 15 },
        { name: 'Leg Press', reps: 15 },
        { name: 'Calf Raises', reps: 20 }
    ],
    abs: [
        { name: 'Crunches', reps: 20 },
        { name: 'Planks', reps: '60 sec' },
        { name: 'Russian Twists', reps: 15 },
        { name: 'Leg Raises', reps: 15 }
    ],
    fullbody: [
        { name: 'Burpees', reps: 10 },
        { name: 'Mountain Climbers', reps: 20 },
        { name: 'Jump Squats', reps: 15 },
        { name: 'Push Up to Rotation', reps: 12 }
    ]
};

// Avatar data
const avatarData = [
    { name: 'lion', emoji: '🦁' },
    { name: 'deer', emoji: '🦌' },
    { name: 'eagle', emoji: '🦅' },
    { name: 'tiger', emoji: '🐯' },
    { name: 'crocodile', emoji: '🐊' },
    { name: 'black panther', emoji: '🐆' }
];

// Study Page Functions
function initStudyPage() {
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startStudy');
    const pauseBtn = document.getElementById('pauseStudy');
    const resetBtn = document.getElementById('resetStudy');
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    if (!startBtn) return;
    
    let duration = 25 * 60;
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            if (e.target.dataset.mode === '25') {
                duration = 25 * 60;
            } else if (e.target.dataset.mode === '50') {
                duration = 50 * 60;
            } else if (e.target.dataset.mode === 'custom') {
                const custom = prompt('Enter duration in minutes:');
                if (custom) {
                    duration = parseInt(custom) * 60;
                }
            }
            
            state.studyTime = 0;
            state.studyDuration = duration;
            updateTimerDisplay(timerDisplay, state.studyTime, duration);
        });
    });
    
    startBtn.addEventListener('click', () => {
        if (state.studyTimer) return;
        state.studyDuration = duration;
        
        state.studyTimer = setInterval(() => {
            state.studyTime++;
            updateTimerDisplay(timerDisplay, state.studyTime, duration);
            
            if (state.studyTime >= duration) {
                clearInterval(state.studyTimer);
                state.studyTimer = null;
                saveStudySession(duration);
                showNotification('Study session completed!', 'success');
                state.studyTime = 0;
            }
        }, 1000);
    });
    
    pauseBtn.addEventListener('click', () => {
        if (state.studyTimer) {
            clearInterval(state.studyTimer);
            state.studyTimer = null;
        }
    });
    
    resetBtn.addEventListener('click', () => {
        if (state.studyTimer) {
            clearInterval(state.studyTimer);
            state.studyTimer = null;
        }
        state.studyTime = 0;
        updateTimerDisplay(timerDisplay, 0, duration);
    });
    
    // YouTube Doubt Solver
    const youtubeBtn = document.getElementById('youtubeSearchBtn');
    const youtubeInput = document.getElementById('youtubeInput');
    const youtubePreview = document.getElementById('youtubePreview');
    
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', () => {
            const query = youtubeInput.value.trim();
            if (query) {
                const url = `https://www.youtube.com/embed/results?search_query=${encodeURIComponent(query)}`;
                youtubePreview.innerHTML = `<iframe width="100%" height="500" src="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
            }
        });
    }
    
    // Load stats
    loadStudyStats();
}

function updateTimerDisplay(element, current, total) {
    const minutes = Math.floor((total - current) / 60);
    const seconds = (total - current) % 60;
    element.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

async function saveStudySession(duration) {
    try {
        await fetch('/api/save-study-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                duration: Math.floor(duration / 60),
                mode: 'study'
            })
        });
    } catch (error) {
        console.error('Error saving study session:', error);
    }
}

async function loadStudyStats() {
    try {
        const userData = await loadUserData();
        const todayFocus = document.getElementById('todayFocus');
        const totalSessions = document.getElementById('totalSessions');
        const weeklyHours = document.getElementById('weeklyHours');
        
        if (todayFocus) {
            const today = new Date().toDateString();
            const todaySession = userData.study_sessions.filter(s => 
                new Date(s.timestamp).toDateString() === today
            );
            const todayMinutes = todaySession.reduce((acc, s) => acc + s.duration, 0);
            todayFocus.textContent = todayMinutes;
        }
        
        if (totalSessions) {
            totalSessions.textContent = userData.study_sessions.length;
        }
        
        if (weeklyHours) {
            weeklyHours.textContent = userData.study_hours.toFixed(1);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Fitness Page Functions
function initFitnessPage() {
    const muscleSelector = document.getElementById('muscleSelector');
    const difficultySelector = document.getElementById('difficultySelector');
    const exerciseList = document.getElementById('exerciseList');
    const timerDisplay = document.getElementById('fitnessTimerDisplay');
    const startBtn = document.getElementById('startFitness');
    const pauseBtn = document.getElementById('pauseFitness');
    const resetBtn = document.getElementById('resetFitness');
    
    if (!muscleSelector) return;
    
    let workoutDuration = 30 * 60;
    
    muscleSelector.addEventListener('change', (e) => {
        const muscle = e.target.value;
        if (muscle && exercises[muscle]) {
            state.currentExercises = exercises[muscle];
            displayExercises(exerciseList, state.currentExercises);
        }
    });
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (state.fitnessTimer) return;
            
            state.fitnessTimer = setInterval(() => {
                state.fitnessTime++;
                updateTimerDisplay(timerDisplay, state.fitnessTime, workoutDuration);
                
                if (state.fitnessTime >= workoutDuration) {
                    clearInterval(state.fitnessTimer);
                    state.fitnessTimer = null;
                    saveFitnessSession(workoutDuration);
                    showNotification('Workout completed! Great job!', 'success');
                    state.fitnessTime = 0;
                }
            }, 1000);
        });
        
        pauseBtn.addEventListener('click', () => {
            if (state.fitnessTimer) {
                clearInterval(state.fitnessTimer);
                state.fitnessTimer = null;
            }
        });
        
        resetBtn.addEventListener('click', () => {
            if (state.fitnessTimer) {
                clearInterval(state.fitnessTimer);
                state.fitnessTimer = null;
            }
            state.fitnessTime = 0;
            updateTimerDisplay(timerDisplay, 0, workoutDuration);
        });
    }
    
    // YouTube Fitness Search
    const youtubeBtn = document.getElementById('fitnessYoutubeBtn');
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', () => {
            const query = document.getElementById('fitnessYoutubeInput').value.trim();
            if (query) {
                window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' workout')}`, '_blank');
            }
        });
    }
    
    loadFitnessStats();
}

function displayExercises(container, exerciseList) {
    container.innerHTML = '';
    exerciseList.forEach(exercise => {
        const div = document.createElement('div');
        div.style.cssText = `
            background: rgba(138, 43, 226, 0.1);
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 8px;
            border-left: 3px solid #ff2d95;
        `;
        div.innerHTML = `
            <strong>${exercise.name}</strong> × ${exercise.reps}
        `;
        container.appendChild(div);
    });
}

async function saveFitnessSession(duration) {
    try {
        const muscle = document.getElementById('muscleSelector').value;
        const difficulty = document.getElementById('difficultySelector').value;
        
        await fetch('/api/save-workout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                muscle_group: muscle,
                difficulty: difficulty,
                duration: Math.floor(duration / 60)
            })
        });
    } catch (error) {
        console.error('Error saving fitness session:', error);
    }
}

async function loadFitnessStats() {
    try {
        const userData = await loadUserData();
        const workoutCount = document.getElementById('workoutCount');
        const totalTime = document.getElementById('totalTime');
        const favoriteGroup = document.getElementById('favoriteGroup');
        
        if (workoutCount) {
            workoutCount.textContent = userData.fitness_sessions;
        }
        
        if (totalTime) {
            const totalMinutes = userData.workout_sessions.reduce((acc, s) => acc + s.duration, 0);
            totalTime.textContent = totalMinutes;
        }
        
        if (favoriteGroup && userData.workout_sessions.length > 0) {
            const muscles = userData.workout_sessions.map(s => s.muscle_group);
            const favorite = muscles.reduce((a, b, _, arr) =>
                (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b)
            );
            favoriteGroup.textContent = favorite;
        }
    } catch (error) {
        console.error('Error loading fitness stats:', error);
    }
}

// Shop Page Functions
function initShopPage() {
    const uploadForm = document.getElementById('uploadForm');
    const imageInput = document.getElementById('productImage');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('name', document.getElementById('productName').value);
            formData.append('link', document.getElementById('productLink').value);
            formData.append('description', document.getElementById('productDescription').value);
            formData.append('image', imageInput.files[0]);
            
            try {
                const response = await fetch('/api/upload-product', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    showNotification('Product uploaded successfully!', 'success');
                    uploadForm.reset();
                    loadProducts();
                } else {
                    showNotification('Error uploading product', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error uploading product', 'error');
            }
        });
    }
    
    loadProducts();
}

async function loadProducts() {
    try {
        const response = await fetch('/api/get-products');
        const data = await response.json();
        const gallery = document.getElementById('productGallery');
        
        if (!gallery) return;
        
        gallery.innerHTML = '';
        
        if (data.products.length === 0) {
            gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #b0b0b0;">No products yet. Be the first to share!</p>';
            return;
        }
        
        data.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-actions">
                        <a href="${product.link}" target="_blank" class="product-btn">Visit Product</a>
                        <button class="product-btn" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            `;
            gallery.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await fetch(`/api/delete-product/${id}`, { method: 'DELETE' });
            showNotification('Product deleted', 'success');
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            showNotification('Error deleting product', 'error');
        }
    }
}

// Profile Page Functions
function initProfilePage() {
    const avatarGrid = document.getElementById('avatarGrid');
    
    if (avatarGrid) {
        avatarData.forEach(avatar => {
            const card = document.createElement('div');
            card.className = 'avatar-card';
            if (avatar.name === state.selectedAvatar) {
                card.classList.add('selected');
            }
            card.innerHTML = `
                <div class="avatar-image">${avatar.emoji}</div>
                <div class="avatar-name">${avatar.name}</div>
            `;
            card.addEventListener('click', async () => {
                // Remove previous selection
                document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
                // Add to clicked
                card.classList.add('selected');
                // Save to backend
                try {
                    await fetch('/api/set-avatar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ avatar: avatar.name })
                    });
                    showNotification(`Avatar changed to ${avatar.name}!`, 'success');
                } catch (error) {
                    console.error('Error setting avatar:', error);
                }
            });
            avatarGrid.appendChild(card);
        });
    }
    
    loadProfileStats();
}

async function loadProfileStats() {
    try {
        const userData = await loadUserData();
        const selectedAvatar = document.getElementById('selectedAvatar');
        const studyHours = document.getElementById('profileStudyHours');
        const fitnessSessions = document.getElementById('profileFitnessSessions');
        const productsUploaded = document.getElementById('profileProductsUploaded');
        
        if (selectedAvatar) {
            const avatar = avatarData.find(a => a.name === userData.avatar);
            selectedAvatar.textContent = avatar ? `${avatar.emoji} ${avatar.name}` : 'Lion 🦁';
        }
        if (studyHours) studyHours.textContent = userData.study_hours.toFixed(1);
        if (fitnessSessions) fitnessSessions.textContent = userData.fitness_sessions;
        if (productsUploaded) productsUploaded.textContent = userData.products_uploaded;
    } catch (error) {
        console.error('Error loading profile stats:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    loadUserData();
    
    const path = window.location.pathname;
    if (path === '/study') {
        initStudyPage();
    } else if (path === '/fitness') {
        initFitnessPage();
    } else if (path === '/shop') {
        initShopPage();
    } else if (path === '/profile') {
        initProfilePage();
    }
});
