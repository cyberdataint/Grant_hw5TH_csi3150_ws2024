const carsContainer = document.getElementById("carsContainer");
const minYearInput = document.getElementById("minYear");
const maxYearInput = document.getElementById("maxYear");
const maxMileageInput = document.getElementById("maxMileage");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const makeSelect = document.getElementById("make");
const colorSelect = document.getElementById("color");
const noResultsMessage = document.getElementById("noResultsMessage");

async function init() {
  loadFilters();
  displayCars(usedCars);
}

function clearResults() {
  carsContainer.innerHTML = "";
}

function displayCars(cars) {
  clearResults();
  if (cars.length === 0) {
    noResultsMessage.classList.remove("hidden");
  } else {
    noResultsMessage.classList.add("hidden");
    carsContainer.innerHTML = cars.map(createCarCard).join("");
  }
}

function createCarCard(car) {
  const { make, year, mileage, price, color, image } = car;

  return `
    <div class="card">
      <div class="card-content">
        <h3>${make} - ${year}</h3>
        <p>Price: $${price}</p>
        <p>Mileage: ${mileage} miles</p>
        <p>Color: ${color}</p>
      </div>
    </div>
  `;
}

function loadFilters() {
  const makes = [...new Set(usedCars.map((car) => car.make))];
  const colors = [...new Set(usedCars.map((car) => car.color))];

  makeSelect.innerHTML = makes
    .map((make) => `<option value="${make}">${make}</option>`)
    .join("");
  colorSelect.innerHTML = colors
    .map((color) => `<option value="${color}">${color}</option>`)
    .join("");
}

document.getElementById("clearButton").addEventListener("click", () => {
  document.getElementById("minYear").value = "";
  document.getElementById("maxYear").value = "";
  document.getElementById("make").selectedIndex = -1;
  document.getElementById("maxMileage").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("color").selectedIndex = -1;
  showResults(usedCars);
});

function applyFilters() {
  const minYear = parseInt(minYearInput.value) || 0;
  const maxYear = parseInt(maxYearInput.value) || new Date().getFullYear();
  const maxMileage = parseInt(maxMileageInput.value) || Infinity;
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;

  const selectedMakes = Array.from(makeSelect.selectedOptions).map(
    (option) => option.value
  );
  const selectedColors = Array.from(colorSelect.selectedOptions).map(
    (option) => option.value
  );

  const filteredCars = usedCars.filter(
    (car) =>
      car.year >= minYear &&
      car.year <= maxYear &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
      (selectedColors.length === 0 || selectedColors.includes(car.color))
  );

  displayCars(filteredCars);
}

document.getElementById("filterButton").addEventListener("click", applyFilters);

init();
