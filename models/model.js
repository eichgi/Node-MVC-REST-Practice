'use strict';

const mysql = require('mysql'),
    conf = require('./db-conf'),
    dbOptions = {
        host: conf.mysql.host,
        user: conf.mysql.user,
        password: conf.mysql.pass,
        port: conf.mysql.port,
        database: conf.mysql.db
    },
    conn = mysql.createConnection(dbOptions);

conn.connect((err) => {
    return (err)
        ? console.log('Error al conectarse a MySQL: ' + err.stack)
        : console.log('Conexión exitosa a MySQL: ' + conn.threadId);
});

module.exports = conn;
