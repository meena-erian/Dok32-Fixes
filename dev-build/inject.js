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
	
	const components = [
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
	]

	components.forEach(comp => preload(comp));

	let inDocScript = document.createElement("script");
	inDocScript.innerHTML = `
	import("${base}/index.js").then(indexModule =>
		indexModule.default()
	);
	`;
	document.body.append(inDocScript);
})();