const app = require('express')();

app.get('/', (req, res) => res.send('Hi! I am soumit-bot. Find me on github and discord.'));

app.listen(process.env.PORT || 4869);

if (process.env.PING_HOST && process.env.PING_INTERVAL) {
    const request = require('request');
    const ping = () => request(process.env.PING_HOST, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print body of response received
    });
    ping();
    setInterval(ping, process.env.PING_INTERVAL);
}
