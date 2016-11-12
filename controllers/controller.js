'use strict';

const UsuariosModel = require('../models/usuarios-model'),
    CursosModel = require('../models/cursos-model'),
    CursosUsuariosModel = require('../models/cursos-usuarios-model'),
    um = new UsuariosModel(),
    cm = new CursosModel(),
    cum = new CursosUsuariosModel();

class Controller {

    index(req, res, next) {
        let Data = {};
        um.getAll((err, data)=> {
            if (!err) {
                Data.usuarios = data;
                //console.log(data);
                cm.getAll((err, data)=> {
                    if (!err) {
                        Data.cursos = data;
                        console.log(Data);
                        res.render('index', {
                            data: Data
                        });
                    }
                });

            }
        });
    }

    registrar(req, res, next) {
        res.render('registrar');
    }

    inscribir(req, res, next) {
        let Data = {};
        um.getAll((err, data) => {
            if (!err) {
                Data.usuarios = data;
                cm.getAll((err, data) => {
                    if (!err) {
                        Data.cursos = data;
                        res.render('inscribir', {
                            data: Data
                        });
                    }
                });
            }
        });
    }

    actualizar(req, res, next) {
        let body = req.body;
        //console.log(body);
        switch (body.accion) {
            case 'actualizarUsuario':
                let usuario = {
                    id: body.id,
                    nombre: body.nombre,
                    apellido: body.apellido,
                    edad: body.edad
                };
                um.save(usuario, (err)=> {
                    if (!err) {
                        res.redirect('/');
                    }
                });
                break;
            case 'actualizarCurso':
                let curso = {
                    id: body.id,
                    nombre: body.nombre,
                    lenguaje: body.lenguaje,
                    costo: body.costo
                };
                cm.save(curso, (err, data)=> {
                    console.log('Registros afectados: ' + data);
                    if (!err) {
                        res.redirect('/');
                    }
                });
                break;
        }

    }

    delete(req, res, next) {
        let body = req.body;
        let id = body.id;
        switch (body.accion) {
            case 'eliminarUsuario':
                um.delete(id, (err)=> {
                    if (!err) {
                        res.json({status: "OK"});
                    }
                });
                break;
            case 'eliminarCurso':
                cm.delete(id, (err)=> {
                    if (!err) {
                        res.json({status: "OK"});
                    }
                });
                break;
        }

    }

    api(req, res, next) {
        let body = req.body;
        switch (body.accion) {
            case 'registrarCurso':
                let curso = {
                    id: body.id || 0,
                    nombre: body.nombre,
                    lenguaje: body.lenguaje,
                    costo: body.costo
                };

                cm.save(curso, (err)=> {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        return next(new Error('Registro no salvado'));
                    }
                });
                break;
            case 'registrarUsuario':
                let usuario = {
                    id: body.id || 0,
                    nombre: body.nombre,
                    apellido: body.apellido,
                    edad: body.edad
                };

                um.save(usuario, (err)=> {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        return next(new Error('Registro no salvado'));
                    }
                });
                break;
            case 'inscribirUsuarioACurso':
                let inscripcion = {
                    usuario_id: body.id_usuario,
                    curso_id: body.id_curso
                };

                cum.save(inscripcion,
                    (err)=> {
                        if (!err) {
                            res.json({
                                status: "OK",
                                mensaje: "Usuario inscrito"
                            });
                        } else {
                            return next(new Error('Registro no salvado'));
                        }
                    }, () => {
                        res.json({
                            status: "ERROR",
                            mensaje: "El usuario ya estaba inscrito"
                        });
                    });
                break;
        }
    }

    modificar(req, res, next) {
        let query = req.query;
        switch (query.tipo) {
            case 'Usuario':
                um.getOne(query.id, (err, data)=> {
                    if (!err) {
                        res.render('modificar', {
                            data: data,
                            tipo: query.tipo
                        });
                    }
                });
                break;
            case 'Curso':
                cm.getOne(query.id, (err, data)=> {
                    if (!err) {
                        res.render('modificar', {
                            data: data,
                            tipo: query.tipo
                        });
                    }
                });
                break;
        }
    }


    getAll(req, res, next) {
        um.getAll((err, data)=> {
            if (!err) {

            }
        });
    }

    error404(req, res, next) {
        let err = new Error();
        err.status = 404;
        err.statusText = 'Not Found';
        res.render('error', {error: err});
    }
}

module.exports = Controller;
