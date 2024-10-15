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
  counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;
});

// Variables for tracking time
let lastTime: number = performance.now();
let growthRate = 0;

// Create upgrade buttons
const upgradeButtons = {
  A: document.createElement("button"),
  B: document.createElement("button"),
  C: document.createElement("button"),
};

// Button labels
upgradeButtons.A.innerHTML = "💲 Buy A (+0.1/sec)";
upgradeButtons.B.innerHTML = "💲 Buy B (+2/sec)";
upgradeButtons.C.innerHTML = "💲 Buy C (+50/sec)";

// Disable buttons initially
upgradeButtons.A.disabled = true;
upgradeButtons.B.disabled = true;
upgradeButtons.C.disabled = true;

// Append buttons to app
app.append(upgradeButtons.A);
app.append(upgradeButtons.B);
app.append(upgradeButtons.C);

// Initial prices for each item
const prices = { A: 10, B: 100, C: 1000 };

// Display current prices
const priceDisplay = document.createElement("div");
priceDisplay.innerHTML = `Prices: A: ${prices.A.toFixed(2)} pancakes, B: ${prices.B.toFixed(2)} pancakes, C: ${prices.C.toFixed(2)} pancakes`;
app.append(priceDisplay);

// Tracking purchases
const purchases = { A: 0, B: 0, C: 0 };

// Display purchases and growth rate
const statusDisplay = document.createElement("div");
statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} pancakes/sec. Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`;
app.append(statusDisplay);

// Function to update upgrade button state
function updateUpgradeButtons() {
  upgradeButtons.A.disabled = counter < prices.A;
  upgradeButtons.B.disabled = counter < prices.B;
  upgradeButtons.C.disabled = counter < prices.C;
}

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Update the counter based on time elapsed
  counter += (growthRate * deltaTime) / 1000;
  counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;

  updateUpgradeButtons();

  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

// Event listener for upgrade button purchases
upgradeButtons.A.addEventListener("click", () => {
  if (counter >= prices.A) {
    counter -= prices.A;
    growthRate += 0.1;
    purchases.A += 1;
    prices.A *= 1.15; // Increase price by 15%
    counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;
    priceDisplay.innerHTML = `Prices: A: ${prices.A.toFixed(2)} pancakes, B: ${prices.B.toFixed(2)} pancakes, C: ${prices.C.toFixed(2)} pancakes`;
    statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} pancakes/sec. Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`;
    updateUpgradeButtons();
  }
});

upgradeButtons.B.addEventListener("click", () => {
  if (counter >= prices.B) {
    counter -= prices.B;
    growthRate += 2.0;
    purchases.B += 1;
    prices.B *= 1.15; // Increase price by 15%
    counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;
    priceDisplay.innerHTML = `Prices: A: ${prices.A.toFixed(2)} pancakes, B: ${prices.B.toFixed(2)} pancakes, C: ${prices.C.toFixed(2)} pancakes`;
    statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} pancakes/sec. Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`;
    updateUpgradeButtons();
  }
});

upgradeButtons.C.addEventListener("click", () => {
  if (counter >= prices.C) {
    counter -= prices.C;
    growthRate += 50.0;
    purchases.C += 1;
    prices.C *= 1.15; // Increase price by 15%
    counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;
    priceDisplay.innerHTML = `Prices: A: ${prices.A.toFixed(2)} pancakes, B: ${prices.B.toFixed(2)} pancakes, C: ${prices.C.toFixed(2)} pancakes`;
    statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} pancakes/sec. Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`;
    updateUpgradeButtons();
  }
});
