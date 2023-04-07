let launcherData = null;

(async () => {
	const response = await fetch("https://isro.vercel.app/api/launchers");
	launcherData = await response.json();
	displayLaunchers(launcherData.launchers);
})();

function displayLaunchers(list) {
	const launch = document.getElementById("launchers-list");
	launch.innerHTML = "";

	let output = "";
	list.forEach((launcher) => {
		output += `<li>${launcher.id}</li>`;
	});
	launch.innerHTML = output;
}
