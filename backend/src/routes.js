const express = require('express');
const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

const routes = express.Router();

//routes.get('/', (request, response  ) => {
    //response.send(`Hello ${request.query.name}`);
//    response.json({ message: `Olá ${request.query.name}`});

//});

//routes.post('/devs', (request, response  ) => {
//    response.json(request.body);

//});

routes.get('/devs', devController.index);

routes.post('/devs', devController.store);
routes.post('/devs/:devId/likes', likeController.store );
routes.post('/devs/:devId/dislikes', dislikeController.store );

module.exports = routes;