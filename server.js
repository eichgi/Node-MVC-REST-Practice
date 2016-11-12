'use strict';

const app = require('./app'),
    server = app.listen(app.get('port'), () => {
        console.log('Iniciando API CRUD con MySQL en el puerto ' + app.get('port'));
    });