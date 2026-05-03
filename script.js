/*
    Main Script for Dynamic Nature Scene
    Handles: Day/Night Cycle, Object Movement, Cloud Generation, Speed Control
*/

// Configuration
const CONFIG = {
    dayDuration: 60, // Total duration of one full day/night cycle in seconds
    baseSpeed: 1
};

// State
let startTime = null;
let speedMultiplier = 1;

// DOM Elements
const sky = document.getElementById('sky');
const seaLayer = document.getElementById('sea-layer');
const seaBase = document.getElementById('sea-base'); // Added Sea Base Element
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const starsContainer = document.getElementById('stars-container');
const cloudsLayer = document.getElementById('clouds-layer');
const plane = document.getElementById('plane');
const rocket = document.getElementById('rocket');
const boat = document.getElementById('boat');
const speedDisplay = document.getElementById('speed-display');
const btnSlower = document.getElementById('btn-slower');
const btnFaster = document.getElementById('btn-faster');

// Initialize Stars
function initStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 60}%`; // Top 60% of screen
        
        // Add twinkle animation with random delay
        const duration = Math.random() * 2 + 1;
        star.style.animation = `twinkle ${duration}s ease-in-out ${Math.random() * 2}s infinite`;
        
        starsContainer.appendChild(star);
    }
}

// Initialize Clouds
function initClouds() {
    for (let i = 0; i < 10; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.innerHTML = '<i class="far fa-cloud"></i>';
        
        const size = Math.random() * 2 + 1.5; // 1.5rem to 3.5rem
        cloud.style.fontSize = `${size}rem`;
        
        const duration = Math.random() * 20 + 30; // 30s to 50s
        const delay = Math.random() * -50;
        
        cloud.style.top = `${Math.random() * 80}%`;
        cloud.style.animation = `cloud-drift ${duration}s linear ${delay}s infinite`;
        
        cloudsLayer.appendChild(cloud);
    }
    
    // Add CSS for cloud drift
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes cloud-drift {
            0% { transform: translateX(-20vw); }
            100% { transform: translateX(120vw); }
        }
    `;
    document.head.appendChild(style);
}

// Update Scene
function updateScene(progress) {
    // Progress: 0 to 1
    // 0.0 - 0.25: Night to Sunrise
    // 0.25 - 0.5: Sunrise to Noon
    // 0.5 - 0.75: Noon to Dusk
    // 0.75 - 1.0: Dusk to Night
    
    // Move the background position to simulate time passing
    // The gradient is 400% height, so we move from 0% to 100%
    const gradientY = progress * 100;
    sky.style.backgroundPosition = `0% ${gradientY}%`;
    
    // Determine phase for celestial bodies
    // Night: 0.0-0.25 and 0.75-1.0
    // Day: 0.25-0.75
    
    const isNight = (progress < 0.25) || (progress > 0.75);
    const isDawn = (progress >= 0.25 && progress < 0.35);
    const isDusk = (progress >= 0.65 && progress < 0.75);
    
    // Celestial Visibility
    if (isNight) {
        sun.style.opacity = 0;
        moon.style.opacity = 1;
        starsContainer.style.opacity = 1;
    } else if (isDawn || isDusk) {
        // Transition periods
        sun.style.opacity = 0.8;
        moon.style.opacity = 0.5;
        starsContainer.style.opacity = 0.5;
    } else {
        // Full Day
        sun.style.opacity = 1;
        moon.style.opacity = 0;
        starsContainer.style.opacity = 0;
    }
    
    // Sun Movement (Visible during Day: 0.25 to 0.75)
    if (progress >= 0.25 && progress <= 0.75) {
        const sunProgress = (progress - 0.25) / 0.5; // Normalize to 0-1
        const sunX = 100 - (sunProgress * 120); // 100% to -20%
        sun.style.transform = `translateX(${sunX}vw)`;
    }
    
    // Moon Movement (Visible during Night: 0.0-0.25 and 0.75-1.0)
    if (progress < 0.25 || progress > 0.75) {
        let moonProgress;
        if (progress < 0.25) {
            moonProgress = progress / 0.25; // 0 to 1
        } else {
            moonProgress = (progress - 0.75) / 0.25; // 0 to 1
        }
        const moonX = 100 - (moonProgress * 120);
        moon.style.transform = `translateX(${moonX}vw)`;
    }
    
    // Update Sea Color based on time
    if (isNight) {
        seaBase.style.background = '#001a2e'; // Deep Night Blue
    } else if (isDawn) {
        seaBase.style.background = '#004e6b'; // Dawn Pinkish
    } else if (isDusk) {
        seaBase.style.background = '#203a43'; // Dusk Dark Blue
    } else {
        // Daytime
        if (progress < 0.5) {
            seaBase.style.background = '#006994'; // Morning Blue
        } else {
            seaBase.style.background = '#004e6b'; // Afternoon Darker Blue
        }
    }
    
    // Objects Movement
    const timeScale = speedMultiplier;
    
    // Plane: Left to Right with slight wave
    const planeProgress = (Date.now() / 1000 * timeScale * 0.05) % 1;
    plane.style.left = `${planeProgress * 120 - 10}%`;
    plane.style.top = `${15 + Math.sin(planeProgress * Math.PI * 4) * 5}%`;
    
    // Boat: Left to Right, slower
    const boatProgress = (Date.now() / 1000 * timeScale * 0.02) % 1;
    boat.style.left = `${boatProgress * 120 - 10}%`;
    
    // Rocket: Arc Movement with Rotation (Left to Right)
    const rocketCycleTime = 15;
    const rocketTime = (Date.now() / 1000 * speedMultiplier) % rocketCycleTime;
    const rocketNorm = rocketTime / rocketCycleTime; // 0 to 1
    // Path: Bottom Left -> Top Center -> Bottom Right
    const rocketX = rocketNorm * 100;
    const rocketY = 80 - (Math.sin(rocketNorm * Math.PI) * 70);
    // Angles for Left-to-Right Arc
    const startAngle = 0;
    const peakAngle = 45;
    const endAngle = 90;
    let currentAngle;
    if (rocketNorm <= 0.5) {
        // Ascent Phase
        const phaseNorm = rocketNorm * 2; 
        currentAngle = startAngle + (peakAngle - startAngle) * phaseNorm;
    } else {
        // Descent Phase
        const phaseNorm = (rocketNorm - 0.5) * 2;
        currentAngle = peakAngle + (endAngle - peakAngle) * phaseNorm;
    }
    rocket.style.left = `${rocketX}%`;
    rocket.style.top = `${rocketY}%`;
    rocket.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
    
    // Update Clouds Speed
    document.documentElement.style.setProperty('--speed', speedMultiplier);
}

// Speed Controls
btnSlower.addEventListener('click', (e) => {
    e.preventDefault();
    if (speedMultiplier > 0.2) {
        speedMultiplier -= 0.2;
        updateSpeedDisplay();
    }
});
btnFaster.addEventListener('click', (e) => {
    e.preventDefault();
    if (speedMultiplier < 3) {
        speedMultiplier += 0.2;
        updateSpeedDisplay();
    }
});
function updateSpeedDisplay() {
    speedDisplay.innerText = `Speed: ${speedMultiplier.toFixed(1)}x`;
}

// Main Animation Loop
function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    
    const progress = (elapsed / CONFIG.dayDuration) % 1;
    
    updateScene(progress);
    
    requestAnimationFrame(animate);
}

// Initialization
window.addEventListener('load', () => {
    initStars();
    initClouds();
    requestAnimationFrame(animate);
});
