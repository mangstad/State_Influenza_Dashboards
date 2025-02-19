var tooltipSpan = document.getElementById('details-box');

async function getData(url) {
	const response = await fetch(url);
	return response.json();
}

urls = null;

async function getURLs() {
	urls = await getData("./dashboard_urls.json");
}

getURLs();

const svgObject = document.getElementById("map");

svgDoc = null;

svgObject.addEventListener("load", () => {
	svgDoc = svgObject.contentDocument;
	svgDoc.addEventListener('mouseover', function (e) {
		if (e.target.tagName == 'path') {
			var content = e.target.dataset.name;
			document.getElementById("details-box").innerHTML = content;
			document.getElementById("details-box").style.opacity = "100%";
		}
		else {
			document.getElementById("details-box").style.opacity = "0%";
		}
	});
	
	svgDoc.addEventListener('click', function (e) {
		if (e.target.tagName === 'path') {
			var stateName = e.target.dataset.name;
			if (stateName) {
				resultURL = urls.find((element) => element.name==stateName).url;
				var gotoUrl = resultURL
				window.open(gotoUrl,'_blank');
			}
		}
	});
	
	svgDoc.onmousemove = function (e) {
		var x = e.clientX,
			y = e.clientY;
		tooltipSpan.style.top = (y + 20) + 'px';
		tooltipSpan.style.left = (x) + 'px';
	};
});
