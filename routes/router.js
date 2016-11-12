'use strict';
const Controller = require('../controllers/controller'),
    express = require('express'),
    router = express.Router(),
    controller = new Controller();

router.get('/', controller.index);

router.get('/registrar', controller.registrar);

router.get('/inscribir', controller.inscribir);

router.get('/modificar', controller.modificar);

router.post('/api', controller.api);

router.put('/actualizar', controller.actualizar);

router.delete('/eliminar', controller.delete);

router.use(controller.error404);

module.exports = router;
