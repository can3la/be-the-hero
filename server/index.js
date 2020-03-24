const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.json({
        message: 'Hello Omnistack 11.0'
    });
});

app.listen(3333);