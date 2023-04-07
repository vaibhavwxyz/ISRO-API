let satelliteData = null;


const countrySelect = document.getElementById("country-select");
const searchButton = document.getElementById("search-button");
const satelliteList = document.getElementById("satellite-list");


(async () => {
	const response = await fetch(
		"https://isro.vercel.app/api/customer_satellites"
	);
	satelliteData = await response.json();

	
	const countries = [
		...new Set(
			satelliteData.customer_satellites.map((satellite) =>
				satellite.country.toLowerCase()
			)
		),
	];

	
	countries.forEach((country) => {
		const option = document.createElement("option");
		option.value = country;
		option.textContent = country[0].toUpperCase() + country.slice(1);
		countrySelect.appendChild(option);
	});

	displaySatellites(satelliteData.customer_satellites);
})();


async function getSatellites(country) {
	const centers = satelliteData.customer_satellites.filter((satellite) => {
		return satellite.country.toLowerCase() === country.toLowerCase();
	});

	return centers;
}


function displaySatellites(satellites) {
	let output = "";
	satellites.forEach((satellite) => {
		output += `
      <li class="center">
        <h3>${satellite.id}</h3>
        <p><strong>Country:</strong> ${satellite.country}</p>
        <p><strong>Mass:</strong> ${satellite.mass}</p>
        <p><strong>Launcher:</strong> ${satellite.launcher}</p>
        <p><strong>Launch Date:</strong> ${satellite.launch_date}</p>
      </li>
    `;
	});
	satelliteList.innerHTML = output;
}

// Event listener for search button
searchButton.addEventListener("click", async (e) => {
	e.preventDefault();
	const country = countrySelect.value;
	const satellites = await getSatellites(country);
	displaySatellites(satellites);
});
