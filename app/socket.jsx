var socket = require('socket.io-client')('http://localhost:1337');

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('news', function(data) {
  //general messges from the server here
  console.log(data);
})

export default socket

