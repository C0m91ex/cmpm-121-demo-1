import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Baby Stacks!";
document.title = gameName;

// Create header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a main button with a pancake-related theme
const button = document.createElement("button");
button.innerHTML = "🥞 Stack a Pancake!";
app.append(button);

// Create a counter display
let counter: number = 0; // Initialize counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `Stacks of Pancakes: ${counter}`;
app.append(counterDisplay);

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `Stacks of Pancakes: ${Math.floor(counter)}`;
});

// Variables for tracking time
let lastTime: number = performance.now();
let growthRate = 0;

// Array containing item data for upgrades
const availableItems = [
  { name: "Syrup Drip", emoji: "💲", rate: 0.1, cost: 10, purchases: 0 },
  { name: "Pancake Chef", emoji: "👨‍🍳", rate: 2, cost: 100, purchases: 0 },
  { name: "Pancake Factory", emoji: "🏭", rate: 50, cost: 1000, purchases: 0 },
];

// Create elements for each upgrade button dynamically
const itemButtons: HTMLButtonElement[] = [];

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.emoji} Buy ${item.name} (+${item.rate} stacks/sec)`;
  upgradeButton.disabled = true;
  app.append(upgradeButton);
  itemButtons.push(upgradeButton);
});

// Display current prices and growth rate
const priceDisplay = document.createElement("div");
app.append(priceDisplay);

const statusDisplay = document.createElement("div");
app.append(statusDisplay);

// Function to update upgrade button states and displays
function updateUI() {
  availableItems.forEach((item, index) => {
    itemButtons[index].disabled = counter < item.cost;
  });

  priceDisplay.innerHTML = availableItems
    .map(
      (item) => `${item.name}: ${item.cost.toFixed(2)} stacks`
    )
    .join(", ");
  
  statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} stacks/sec. ` + 
    availableItems.map(item => `${item.name}: ${item.purchases}`).join(", ");
}

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Update the counter based on time elapsed
  counter += (growthRate * deltaTime) / 1000;
  counterDisplay.innerHTML = `Stacks of Pancakes: ${Math.floor(counter)}`;

  updateUI();

  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

// Event listeners for upgrade button purchases
availableItems.forEach((item, index) => {
  itemButtons[index].addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.purchases += 1;
      item.cost *= 1.15; // Increase price by 15%
      updateUI();
    }
  });
});
