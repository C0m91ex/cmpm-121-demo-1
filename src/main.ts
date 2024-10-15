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
counterDisplay.innerHTML = `Pancakes: ${counter}`;
app.append(counterDisplay);

// Create displays for the growth rate and purchased items
let growthRate = 0;
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(1)} pancakes/sec`;
app.append(growthRateDisplay);

// Track purchased items
const purchases = { A: 0, B: 0, C: 0 };
const purchasesDisplay = document.createElement("div");
purchasesDisplay.innerHTML = `Items: A (${purchases.A}), B (${purchases.B}), C (${purchases.C})`;
app.append(purchasesDisplay);

// Function to update the displays
function updateDisplays() {
  counterDisplay.innerHTML = `Pancakes: ${Math.floor(counter)}`;
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(1)} pancakes/sec`;
  purchasesDisplay.innerHTML = `Items: A (${purchases.A}), B (${purchases.B}), C (${purchases.C})`;
}

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1;
  updateDisplays();
});

// Variables for tracking time
let lastTime: number = performance.now();

// Create upgrade buttons for A, B, and C
const upgradeAButton = document.createElement("button");
upgradeAButton.innerHTML = "Buy A (+0.1 pancakes/sec, Cost: 10)";
upgradeAButton.disabled = true;
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.innerHTML = "Buy B (+2 pancakes/sec, Cost: 100)";
upgradeBButton.disabled = true;
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.innerHTML = "Buy C (+50 pancakes/sec, Cost: 1000)";
upgradeCButton.disabled = true;
app.append(upgradeCButton);

// Function to update the state of upgrade buttons
function updateUpgradeButtons() {
  upgradeAButton.disabled = counter < 10;
  upgradeBButton.disabled = counter < 100;
  upgradeCButton.disabled = counter < 1000;
}

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Update the counter based on time elapsed
  counter += (growthRate * deltaTime) / 1000;
  updateDisplays();
  updateUpgradeButtons();

  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

// Event listeners for upgrade button purchases
upgradeAButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    purchases.A += 1;
    updateDisplays();
  }
});

upgradeBButton.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2.0;
    purchases.B += 1;
    updateDisplays();
  }
});

upgradeCButton.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    purchases.C += 1;
    updateDisplays();
  }
});