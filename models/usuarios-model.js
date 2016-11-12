'use strict';
const conn = require('./model');

class UsuariosModel {

    getOne(id, cb) {
        conn.query('SELECT * FROM usuarios WHERE id = ?', id, cb);
    }

    getAll(cb) {
        conn.query('SELECT * FROM usuarios', cb);
    }

    save(data, cb) {
        conn.query('SELECT * FROM usuarios WHERE id = ?', data.id, (err, rows) => {
            if (!err) {
                return (rows.length == 1)
                    ? conn.query('UPDATE usuarios SET ? WHERE id = ?', [data, data.id], cb)
                    : conn.query('INSERT INTO usuarios SET ?', data, cb);
            }
        });
    }

    delete(id, cb){
        conn.query('DELETE FROM usuarios WHERE id = ?', id, cb);
    }
}

module.exports = UsuariosModel;

