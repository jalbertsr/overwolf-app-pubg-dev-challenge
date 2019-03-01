
function _getUrlParameterByName(paramName) {
	const name = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	const results = regex.exec(window.location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLaunchSource() {
	return _getUrlParameterByName('source');;
}

export default {
	getLaunchSource
}