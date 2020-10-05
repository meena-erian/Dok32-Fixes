(function () {
	let mpreload = document.createElement("LINK");
	mpreload.rel = "modulepreload";
	mpreload.href = "https://everlast.portacode.com/Dok32-fixes/index.js";
	document.head.append(mpreload);
	import("https://everlast.portacode.com/Dok32-fixes/index.js").then(indexModule =>
		indexModule.default()
	);
})();