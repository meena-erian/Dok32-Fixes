(function () {

	let preload = (file) => {
		let mpreload = document.createElement("LINK");
		mpreload.rel = "modulepreload";
		mpreload.href = "https://everlast.portacode.com/Dok32-fixes/" + file;
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

	import("https://everlast.portacode.com/Dok32-fixes/index.js").then(indexModule =>
		indexModule.default()
	);
})();