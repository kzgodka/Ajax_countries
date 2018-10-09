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
		success: showCountriesList
	});
}

function showCountriesList(resp) {
	countriesList.empty();
	resp.forEach(function(item) {
		$('<img src="'+item.flag+'"/>').appendTo(countriesList);
		$('<li class="name">').text(item.name).appendTo(countriesList);

		$('<li class="capital">').text("Stolica: " + item.capital).appendTo(countriesList);
		
	});
}

