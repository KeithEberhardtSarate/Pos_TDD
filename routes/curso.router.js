const express = require('express');
const jwt = require('jsonwebtoken');

const cursoController = require('../controllers/curso.controller');

const cursoRouter = express.Router();

function checkloggedIn(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({
      error: 'Usuário não autenticado',
    });
  }

  try {
    const secret =  process.env.SECRET;

    jwt.verify(token, secret);
    
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido',
    });
  }
  
  next();
};

cursoRouter.post('/',checkloggedIn, cursoController.createCurso);
cursoRouter.get('/', cursoController.getCursos);
cursoRouter.get('/:id', cursoController.getCursoById);
cursoRouter.patch('/:id',checkloggedIn, cursoController.updateCurso);
cursoRouter.delete('/:id',checkloggedIn ,cursoController.deleteCurso);

module.exports = cursoRouter;