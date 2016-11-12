'use strict';
const conn = require('./model');

class CursosUsuariosModel {

    getOne(data, cb) {
        conn
            .query('SELECT * FROM cursos_usuarios WHERE usuario_id = ? and curso_id = ?',
                [data.usuario_id, data.curso_id],
                (err, rows) => {
                    if (!err) {
                        //console.log('Filas encontradas: ' + rows.length);
                        if (rows.length == 1) {
                            res.json({status: "ERROR", mensaje: "El usuario ya esta inscrito"});
                        } else {
                            conn.query('INSERT INTO cursos_usuarios (usuario_id, curso_id) VALUES (?, ?)', [data.usuario_id, data.curso_id], cb);
                        }
                    }
                });
    }

    save(data, trueCb, falseCb) {
        conn.query('SELECT * FROM cursos_usuarios WHERE usuario_id = ? and curso_id = ?',
            [data.usuario_id, data.curso_id],
            (err, rows)=> {
                console.log('Filas encontradas: ' + rows.length);
                if (!err) {
                    if (rows.length == 0) {
                        conn.query('INSERT INTO cursos_usuarios (usuario_id, curso_id) values (?, ?)', [data.usuario_id, data.curso_id], trueCb);
                    } else {
                        falseCb();
                    }
                }
            });
    }
}

module.exports = CursosUsuariosModel;