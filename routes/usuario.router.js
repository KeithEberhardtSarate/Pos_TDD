const express = require('express');

const usuariosController = require('../controllers/usuario.controller');

const usuariosRouter = express.Router();

usuariosRouter.post('/', usuariosController.createUsuario);
usuariosRouter.get('/', usuariosController.getUsuarios);
usuariosRouter.get('/:id', usuariosController.getUsuarioById);
usuariosRouter.patch('/:id', usuariosController.updateUsuario);
usuariosRouter.delete('/:id', usuariosController.deleteUsuario);

module.exports = usuariosRouter;