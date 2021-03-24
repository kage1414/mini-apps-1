const url = '127.0.0.1/json';

var xhr = new XMLHttpRequest();

var sendRequest = () => {
  xhr.open('GET', url);
  xhr.send();
};