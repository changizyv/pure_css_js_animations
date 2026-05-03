# Pure CSS & JS Nature Animations

A dynamic, loop-based nature scene created entirely with vanilla HTML, CSS, and JavaScript. No external libraries (other than FontAwesome icons) are required.

## 🌍 A Tribute to the People of Iran

This project is dedicated to the people of Iran who have been living under severe restrictions for over 70 days. The Iranian government's internet blackout has cut off millions of citizens from the world, disrupting their lives, severing connections with loved ones, and destroying online businesses and livelihoods.

While the sun rises and sets, life goes on for everyone, but for the people of Iran, the days are filled with silence, oppression, and uncertainty. This animation represents the cycle of time that continues regardless of political turmoil, reminding us that freedom and connectivity are fundamental human rights.

**Be the voice of the people of Iran.**
# Iran_Internet_Blackout #Freedom #Iran

## 🎨 Features

- **Day/Night Cycle:** A smooth, continuous gradient transition from dawn to day, dusk to night, and back to dawn without any visual jumps.
- **Dynamic Celestial Bodies:** The Sun and Moon move across the sky according to the time of day.
- **Starfield:** Stars appear at night with a twinkling effect.
- **Interactive Elements:**
  - **Clouds:** Scattered clouds with varying sizes and speeds.
  - **Rocket:** A rocket flies in an arc path, correctly rotating its nose to follow the trajectory.
  - **Plane & Boat:** Moving objects that add life to the scene.
- **Speed Control:** Buttons to slow down or speed up the animation loop.
- **Responsive Design:** Works on various screen sizes.

## 🛠️ Technical Details

### Icons
This project uses **FontAwesome Free (Regular)** icons (`far`).
- **Note on Solid Icons:** The icons used in this project are from the free version of FontAwesome. If you wish to use **Solid** icons (`fas`), which are part of the premium/non-free version, you will need to:
  1. Obtain a FontAwesome Pro license or use the CDN for Solid icons if available in your context.
  2. Change the class names in the HTML from `far fa-...` to `fas fa-...`.
  3. Update the CSS `font-family` if necessary (though usually, the same font family works for both).

### File Structure
- `index.html`: The main structure.
- `style.css`: All styling, gradients, and keyframe animations.
- `script.js`: Logic for the day/night cycle, object movement, and speed control.

### How It Works
1. **Sky Gradient:** A single large CSS gradient is used, and its `background-position` is adjusted via JavaScript to simulate time passing smoothly.
2. **Rocket Rotation:** The rocket's angle is calculated using linear interpolation (`lerp`) between start, peak, and end angles to ensure it points in the direction of movement.
3. **Sea Waves:** SVG-based wave patterns are animated using CSS `@keyframes` to create a continuous ocean effect.

## 🚀 Future Updates

I will be adding more scenarios and animations to this repository soon. Stay tuned for more creative pure CSS/JS projects.

## 📂 Repository

Check out the live project and source code here:
[https://github.com/changizyv/css_js_pure_animition](https://github.com/changizyv/css_js_pure_animition)

---
*Made with ❤️ for creativity and awareness.*
