import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Baby Stacks!";
document.title = gameName;

// Create header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button with a pancake emoji
const button = document.createElement("button");
button.innerHTML = "🥞";
app.append(button);

// Create a counter display
let counter: number = 0; // Initialize counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `Pancake Stacks: ${counter}`;
app.append(counterDisplay);

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1; // Increment counter by 1
  counterDisplay.innerHTML = `Pancake Stacks: ${counter}`; // Update display
});

// Variables for tracking time
let lastTime: number = performance.now();
const incrementPerSecond = 1; // Counter increment rate
const incrementPerFrame = incrementPerSecond / 1000; // Default increment rate

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime; // Calculate time since last frame
  lastTime = time; // Update last time to the current frame time

  // Update the counter based on time elapsed
  counter += (incrementPerSecond * deltaTime) / 1000; // Increment counter
  counterDisplay.innerHTML = `Pancake Stacks: ${Math.floor(counter)}`; // Update display with floored value

  requestAnimationFrame(animate); // Request next frame
}

// Start the animation loop
requestAnimationFrame(animate);