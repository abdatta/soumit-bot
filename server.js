const app = require('express')();

app.get('/', (req, res) => res.send('Hi! I am soumit-bot. Find me on github and discord.'));

app.listen(process.env.PORT || 4869);
