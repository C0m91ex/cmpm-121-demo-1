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
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `Pancake Stacks: ${counter}`;
app.append(counterDisplay);

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1; // Increment counter by 1
  counterDisplay.innerHTML = `Pancake Stacks: ${counter}`;
});

// Variables for tracking time
let lastTime: number = performance.now();
const incrementPerSecond = 1;

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Update the counter based on time elapsed
  counter += (incrementPerSecond * deltaTime) / 1000;
  counterDisplay.innerHTML = `Pancake Stacks: ${Math.floor(counter)}`;

  requestAnimationFrame(animate); // Request next frame
}

// Start the animation loop
requestAnimationFrame(animate);
