import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hot Cakes!";
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

// Event listener to increment the counter
button.addEventListener("click", () => {
  counter += 1; // Increment counter
  counterDisplay.innerHTML = `Pancakes: ${counter}`; // Update display
});
