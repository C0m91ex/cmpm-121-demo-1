import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Baby Stacks!";
document.title = gameName;

// Create header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
header.style.marginBottom = "20px";

// Create a main button with a pancake-related theme
const button = document.createElement("button");
button.innerHTML = "🥞 Stack a Pancake!";
button.classList.add("main-action"); 
app.append(button);
button.style.marginBottom = "20px";

// Create a counter display
let counter: number = 0; // Initialize counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `Stacks of Pancakes: ${counter}`;
app.append(counterDisplay);
counterDisplay.style.marginBottom = "20px";

// Event listener to increment the counter on button click
button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `Stacks of Pancakes: ${Math.floor(counter)}`;
});

// Variables for tracking time
let lastTime: number = performance.now();
let growthRate = 0;

// Define the Item interface
interface Item {
  name: string;
  emoji: string;
  cost: number;
  rate: number;
  description: string;
}

// Create available items
const availableItems: Item[] = [
  {
    name: "Syrup Drip",
    emoji: "🍯",
    cost: 10,
    rate: 0.1,
    description: "A sweet syrup that drips onto your pancakes.",
  },
  {
    name: "Pancake Chef",
    emoji: "👨‍🍳",
    cost: 100,
    rate: 2.0,
    description: "A skilled chef who cooks pancakes quickly.",
  },
  {
    name: "Pancake Factory",
    emoji: "🏭",
    cost: 1000,
    rate: 50.0,
    description: "A factory that churns out pancakes at an increased rate.",
  },
  {
    name: "Syrup River",
    emoji: "🏞️",
    cost: 5000,
    rate: 200.0,
    description: "A flowing river of syrup to enhance every pancake.",
  },
  {
    name: "Pancake Palace",
    emoji: "🏰",
    cost: 10000,
    rate: 500.0,
    description: "A grand palace where pancakes are made to perfection.",
  },
];

// Create upgrade buttons and display descriptions
const itemButtons: HTMLButtonElement[] = [];
availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.emoji} Buy ${item.name} (+${item.rate} stacks/sec)`;
  upgradeButton.disabled = true;

  // Create a description element
  const descriptionDisplay = document.createElement("div");
  descriptionDisplay.innerHTML = `${item.description}`;
  descriptionDisplay.style.fontSize = "0.8em";
  descriptionDisplay.style.marginBottom = "10px";
  app.append(descriptionDisplay);

  app.append(upgradeButton);
  itemButtons.push(upgradeButton);
  upgradeButton.style.marginBottom = "10px";
});

// Initial prices
const prices: number[] = availableItems.map((item) => item.cost);

// Tracking purchases
const purchases: number[] = new Array(availableItems.length).fill(0);

// Display purchases and growth rate
const statusDisplay = document.createElement("div");
statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} stacks/sec. Purchases: ${availableItems.map((item) => `${item.name}: 0`).join(", ")}`;
app.append(statusDisplay);
statusDisplay.style.marginTop = "20px";

// Function to update upgrade button state
function updateUpgradeButtons() {
  itemButtons.forEach((button, index) => {
    button.disabled = counter < prices[index];
  });
}

// Animation loop
function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Update the counter based on time elapsed
  counter += (growthRate * deltaTime) / 1000;
  counterDisplay.innerHTML = `Stacks of Pancakes: ${Math.floor(counter)}`;

  updateUpgradeButtons();

  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

// Event listener for upgrade button purchases
itemButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (counter >= prices[index]) {
      counter -= prices[index];
      growthRate += availableItems[index].rate;
      purchases[index] += 1;
      prices[index] *= 1.15;
      counterDisplay.innerHTML = `Stacks of Pancakes: ${Math.floor(counter)}`;
      statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} stacks/sec. Purchases: ${availableItems.map((item, i) => `${item.name}: ${purchases[i]}`).join(", ")}`;
      updateUpgradeButtons();
    }
  });
});