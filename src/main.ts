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
counterDisplay.innerHTML = `Pancakes: ${counter}`;
app.append(counterDisplay);

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1; 
  counterDisplay.innerHTML = `Pancakes: ${counter}`; 
});

// Variables for tracking time
let lastTime: number = performance.now();
let growthRate = 0; 

// Create upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "💲 Buy Upgrade (+1 growth rate)";
upgradeButton.disabled = true; 
app.append(upgradeButton);

// Function to update upgrade button state
function updateUpgradeButton() {
  upgradeButton.disabled = counter < 10; 
}

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime; 
  lastTime = time; 

  // Update the counter based on time elapsed
  counter += (growthRate * deltaTime) / 1000; 
  counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`; 

 
  updateUpgradeButton();

  requestAnimationFrame(animate); 
}

// Start the animation loop
requestAnimationFrame(animate);

// Event listener for upgrade button purchase
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; 
    growthRate += 1; 
    counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`; 
    updateUpgradeButton(); 
  }
});