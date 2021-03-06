function downloadCSVButton(){
	console.log("Dok32 Fixes extension: Adding new report function button \"Download CSV\"");
	let exportButton = document.createElement("button");
	exportButton.className = "btn btn-dark btn-sm";
	exportButton.id = "download-CSV-button";
	exportButton.onclick = (function () {
		let r = document.querySelector(".table-responsive");
		var fileRaw = "";
		r.querySelectorAll("tr").forEach((ri, i) => {//For each row 
			let cols = Array.from(ri.children);
			if (cols.length > 1) {
				cols.forEach((col, ii) => {
					if (ii > 0) fileRaw += ",";
					fileRaw += `"${col.innerText.replace(/"/g, `""`)}"`;
				});
				fileRaw += "\n";
			}
		});
		let downloadLink = document.createElement("a");
		downloadLink.setAttribute("download", "report.csv");
		downloadLink.href = `data:application/octet-stream;charset=utf-8;base64,${btoa(fileRaw)}`;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	});
	exportButton.innerText = "Download CSV";
	return exportButton;
}
export {downloadCSVButton};