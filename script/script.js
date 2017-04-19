var mainUrl = 'https://restcountries.eu/rest/v2/'
var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName.length) countryName = 'Poland';

	$.ajax({
		url: mainUrl + 'name/' + countryName,
		method: 'GET',
		success: showCountriesList,
        error: function (jqXHR, exception) {
            console.log(jqXHR);
            getErrorMessage(jqXHR, exception);
		}
	});
}

function getErrorMessage(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    alert(msg);
}

function showCountriesList(resp) {
	countriesList.empty();
	resp.forEach(function(item) {
		$('<img src="'+item.flag+'"/>').appendTo(countriesList);
		$('<li class="name">').text(item.name).appendTo(countriesList);

		$('<li class="capital">').text("Stolica: " + item.capital).appendTo(countriesList);
		
	});
}

