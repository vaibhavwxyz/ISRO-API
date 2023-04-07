let centerData = null;

const centres = document.getElementById("centers-list");

function displayCenters(centers) {
	let output = "";
	centers.forEach((center) => {
		output += `
      <li class="center">
        <h3>${center.name}</h3>
        <p><strong>Place:</strong> ${center.Place}</p>
        <p><strong>State:</strong> ${center.State}</p>
      </li>
    `;
	});
	centres.innerHTML = output;
}

async function getCenters(state) {
	const centers = centerData.centres.filter((center) => {
		return center.State.toLowerCase() === state.toLowerCase();
	});

	return centers;
}

const stateSelect = document.getElementById("state-select");
(async () => {
	const res = await fetch("https://isro.vercel.app/api/centres");
	centerData = await res.json();

	
	const states = [...new Set(centerData.centres.map((center) => center.State))];

	
	states.forEach((state) => {
		const option = document.createElement("option");
		option.value = state;
		option.textContent = state;
		stateSelect.appendChild(option);
	});

	displayCenters(centerData.centres);
})();


const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async (e) => {
	e.preventDefault();
	const state = stateSelect.value;
	const centers = await getCenters(state);
	displayCenters(centers);
});
