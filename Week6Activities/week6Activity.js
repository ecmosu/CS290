const baseRequestUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons() {
    document.getElementById('weatherRequest').addEventListener('click', function (event) {
        event.preventDefault();
        let weatherZip = document.getElementById('zipCode').value;
        let weatherName = document.getElementById('cityName').value;
        let req = new XMLHttpRequest();

        //Use ZIP if entered, and use city name if not entered
        let requestCity = weatherZip == '' ? weatherName : weatherZip;
        req.open('GET', baseRequestUrl + 'q=' + requestCity + ',US' + '&appid=' + apiKey + '&units=imperial', true);
        req.addEventListener('load', function () {
            let result = document.getElementById('weatherResults');
            if (req.status >= 200 && req.status < 400) {
                let response = JSON.parse(req.responseText);
                if (response.main == null) {
                    result.textContent = 'Invalid Request';
                }
                else {                    
                    result.innerHTML = '<p>City: ' + response.name + ', ' + response.sys.country + '</p>';
                    result.innerHTML += '<p>Temperature: ' + response.main.temp + ' F</p>';
                    result.innerHTML += '<p>Humidity: ' + response.main.humidity + '%</p>';
                    result.innerHTML += '<p>Pressure: ' + response.main.pressure + ' hPa</p>';
                }
            } else {
                result.textContent = 'Invalid Request';
            }
        });

        req.send(null);
    });

    document.getElementById('postSubmit').addEventListener('click', function (event) {
        event.preventDefault();
        let req = new XMLHttpRequest();
        var payload = {field1:null, field2:null};
        payload.field1 = document.getElementById('field1').value;
        payload.field2 = document.getElementById('field2').value;

        //Use ZIP if entered, and use city name if not entered
        req.open('POST', 'http://flip3.engr.oregonstate.edu:6543/data?type=1&value=dlkfj', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function () {
            let result = document.getElementById('postResults');
            if (req.status >= 200 && req.status < 400) {
                let response = JSON.parse(req.responseText);
                if (response.data == null) {
                    result.textContent = 'Invalid Request';
                }
                else {
                    let responseData = JSON.parse(response.data);
                    result.innerHTML = '<p>Field 1: ' + responseData.field1 + '</p>';
                    result.innerHTML += '<p>Field 2: ' + responseData.field2 + '</p>';
                }
            } else {
                result.textContent = 'Invalid Request';
            }
        });

        req.send(JSON.stringify(payload));
    });
}