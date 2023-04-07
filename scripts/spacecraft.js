const spacecraftContainer = document.getElementById("spacecrafts-list");

let spacecraftData = null;

(async () => {
	const response = await fetch("https://isro.vercel.app/api/spacecrafts");
	spacecraftData = await response.json();
	displaySpacecrafts(spacecraftData);
})();

function displaySpacecrafts({ spacecrafts }) {
	if (!spacecrafts) return;
	spacecraftContainer.innerHTML = "";

	spacecrafts.forEach((spacecraft) => {
		const spacecraftDetails = document.createElement("li");
		spacecraftDetails.innerHTML = spacecraft.name;

		spacecraftContainer.appendChild(spacecraftDetails);
	});
}
