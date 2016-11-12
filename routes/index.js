'use strict';
const conn = require('../models/model'),
    express = require('express'),
    router = express.Router();

function error404(req, res, next) {
    let err = new Error();
    err.status = 404;
    err.statusText = 'NOT FOUND';
    res.render('error', {error: err});
};

router.use(conn);

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Basic Crud'
    });
    /*req.getConnection((err, conn) => {
     conn.query('SELECT * FROM cursos', (error, data) => {
     if (!error) {
     console.log(data);
     res.render('index', {
     title: 'Basic Crud',
     data: data
     });
     }
     })
     });*/
});

router.get('/registrar', (req, res, next) => {
    res.render('registrar');
});

router.get('/inscribir', (req, res, next) => {
    res.render('inscribir');
});

router.get('/modificar', (req, res, next) => {
    res.render('modificar');
});

router.get('/api', (req, res, next) => {
    let query = req.query;
    console.log(req.query);
    switch (query.accion) {
        case 'mostrarUsuarios':
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM usuarios', (error, data) => {
                    if (!error) {
                        //console.log(data);
                        let response = {
                            status: "OK",
                            datos: data
                        };
                        res.send(response);
                    }
                });
            });
            break;
        case 'mostrarCursos':
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM cursos', (error, data) => {
                    if (!error) {
                        //console.log(data);
                        let response = {
                            status: "OK",
                            datos: data
                        };
                        res.send(response);
                    }
                });
            });
            break;
        case 'registrarUsuario':
            req.getConnection((err, conn) => {
                conn
                    .query('insert into usuarios (nombre, apellido, edad) values (?, ?, ?)',
                        [query.nombre, query.apellido, query.edad],
                        (error, data) => {
                            if (!error) {
                                res.redirect('/');
                            }
                        });
            });
            break;
        case 'registrarCurso':
            req.getConnection((err, conn) => {
                conn
                    .query('insert into cursos (nombre, lenguaje, costo) values (?, ?, ?)',
                        [query.nombre, query.lenguaje, query.costo],
                        (error, data) => {
                            if (!error) {
                                res.redirect('/');
                            }
                        });
            });
            break;
        case 'obtenerDatosParaInscripcion':
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM cursos', (error, data) => {
                    if (!error) {
                        let response = {};
                        response.cursos = data;

                        conn.query('SELECT * FROM usuarios', (error, data) => {
                            if (!error) {
                                response.usuarios = data;
                                response.status = 'OK';
                                res.send(response);
                            }
                        });

                    }
                });
            });
            break;
        case 'inscribirUsuarioACurso':
            req.getConnection((err, conn) => {
                conn
                    .query('SELECT * FROM cursos_usuarios where curso_id = ? and usuario_id = ?',
                        [query.id_curso, query.id_usuario],
                        (error, data) => {
                            if (!error) {
                                if (data.length == 1) {
                                    res.json({
                                        status: "ERROR",
                                        mensaje: "El usuario ya esta inscrito"
                                    });
                                } else {
                                    conn.query('INSERT INTO cursos_usuarios (usuario_id, curso_id) values (?, ?)',
                                        [query.id_usuario, query.id_curso],
                                        (error, data) => {
                                            if (!error) {
                                                console.log(data);
                                                if (data.affectedRows == 1) {
                                                    res.json({
                                                        status: "OK",
                                                        mensaje: "Usuario inscrito satisfactoriamente"
                                                    });
                                                }
                                            }
                                        });
                                }
                            }
                        });
            });
            break;
        case "obtenerUsuario":
            req.getConnection((err, conn)=> {
                conn
                    .query('SELECT * FROM usuarios WHERE id = ? LIMIT 1',
                        query.id,
                        (error, data)=> {
                            if (!error) {
                                res.json(data[0]);
                            }
                        });
            });
            break;
        case "obtenerCurso":
            req.getConnection((err, conn)=> {
                conn
                    .query('SELECT * FROM cursos WHERE id = ? LIMIT 1',
                        query.id,
                        (error, data)=> {
                            if (!error) {
                                res.json(data[0]);
                            }
                        });
            });
            break;
        case "actualizarUsuario":
            req.getConnection((error, conn)=> {
                conn
                    .query('UPDATE usuarios SET nombre = ?, apellido = ?, edad = ? WHERE id = ?',
                        [query.nombre, query.apellido, query.edad, query.id],
                        (error, data)=> {
                            if (!error) {
                                if (data.affectedRows == 1) {
                                    res.redirect('/');
                                }
                            } else {
                                console.log(error);
                            }
                        });
            });
            break;
        case "actualizarCurso":
            req.getConnection((error, conn)=> {
                conn
                    .query('UPDATE cursos SET nombre = ?, lenguaje = ?, costo = ? WHERE id = ?',
                        [query.nombre, query.lenguaje, query.costo, query.id],
                        (error, data)=> {
                            if (!error) {
                                if (data.affectedRows == 1) {
                                    res.redirect('/');
                                }
                            } else {
                                console.log(error);
                            }
                        });
            });
            break;
        case "eliminarCurso":
            req.getConnection((error, conn)=> {
                conn
                    .query('DELETE FROM cursos WHERE id = ?',
                        query.id,
                        (error, data) => {
                            if (!error) {
                                if (data.affectedRows == 1) {
                                    //res.redirect('/');
                                    res.json({
                                        status: "OK",
                                        message: "Eliminado"
                                    });
                                }
                            }
                        });
            });
            break;
        case "eliminarUsuario":
            req.getConnection((error, conn)=> {
                conn
                    .query('DELETE FROM usuarios WHERE id = ?',
                        query.id,
                        (error, data) => {
                            if (!error) {
                                if (data.affectedRows == 1) {
                                    //res.redirect('/');
                                    res.json({
                                        status: "OK",
                                        message: "Eliminado"
                                    });
                                }
                            }
                        });
            });
            break;
    }
});


router.use(error404);

module.exports = router;
