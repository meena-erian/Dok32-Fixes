(function () {

	let gitProxy = "https://everlast.portacode.com/Dok32-fixes-gitproxy";
	let version = "dev";
	let folder = "src";


	let base = `${gitProxy}/${version}/${folder}`;

	let preload = (file) => {
		let mpreload = document.createElement("LINK");
		mpreload.rel = "modulepreload";
		mpreload.href = `${base}/${file}`;
		document.head.append(mpreload);
	}

	var components = [
		"addFunctionButtons.js",
		"addPagination.js",
		"analyzeFormStructure.js",
		"bindForm.js",
		"downloadCSVButton.js",
		"everlast-office.dok32.com.js",
		"fetchList.js",
		"generateForm.js",
		"index.js",
		"nationalities.js",
		"objArrTOCSV.js",
		"reportModal.js",
		"sendSMSButton.js",
		"sendSMSModal.js",
		"viewReportButton.js",
	];

	if (document.location.host === "app.dok32.com") {
		components = [
			"trafficSpoofer.js",
			"app.dok32.com.js"
		];
	}

	components.forEach(comp => preload(comp));

	function runWindowModule(base, module, func) {
		let inDocScript = document.createElement("script");
		inDocScript.innerHTML = `
		import("${base}/${module}").then(m =>
			m[\`${func}\`]()
		);
		`;
		document.body.append(inDocScript);
	}

	if(document.location.host === "app.dok32.com"){
		runWindowModule(base, "app.dok32.com.js", "appDok32Com");
	}
	else {
		runWindowModule(base, "index.js", "default");
	}
	
})();