'use strict';
const conn = require('./model');

class CursosModel {

    getOne(id, cb) {
        conn.query('SELECT * FROM cursos WHERE id = ?', id, cb);
    }

    getAll(cb) {
        conn.query('SELECT * FROM cursos', cb);
    }

    save(data, cb) {
        conn.query('SELECT * FROM cursos WHERE id = ?', data.id, (err, rows)=> {
            //console.log('Número de registros: ' + rows.length);
            if (!err) {
                return (rows.length == 1)
                    ? conn.query('UPDATE cursos SET ? WHERE id = ?', [data, data.id], cb)
                    : conn.query('INSERT INTO cursos SET ?', data, cb);
            } else {
                console.log(err);
            }
        });
    }

    delete(id, cb) {
        conn.query('DELETE FROM cursos WHERE id = ?', id, cb);
    }
}

module.exports = CursosModel;