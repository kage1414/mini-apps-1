const endpoint = 'json';

var xhr = new XMLHttpRequest();

var sendRequest = () => {
  xhr.open('POST', endpoint, true);
  xhr.send();
};