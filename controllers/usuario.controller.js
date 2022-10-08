const Usuario = require('../models/usuario.model');

async function createUsuario(req, res) {
  const {
    name,
    email,
  } = req.body

    const usuario = {
      name,
      email,
    }

    try {

        const usuarioExistente = await Usuario.findOne({email: email})

        if(usuarioExistente){
            res.status(200).json({message: 'Usuário já possui cadastro', cadastrado: false})
            return
        }

        const usuarioSaved = await Usuario.create(usuario)

        res.status(201).json({message: 'Usuário inserido com sucesso', cadastrado: true})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getUsuarios(req, res) {
  try {
    const usuario = await Usuario.find()

    res.status(200).json(usuario)
  } catch (error) {
      res.status(500).json({error: error})
  }
}

async function getUsuarioById(req, res) {
  const id = req.params.id
    try {
        const usuario = await Usuario.findOne({_id: id})

        if(!usuario){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateUsuario(req, res) {
  const id = req.params.id

  const {
    name,
    email,
  } = req.body

    const usuario = {
      name,
      email,
    }
    
    try {
        const updatedUsuario = await Usuario.updateOne({_id: id}, usuario)

        if(updatedUsuario.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteUsuario(req, res) {
  const id = req.params.id

  const usuario = await Usuario.findOne({_id: id})

  if(!usuario){
    res.status(422).json({message: 'Usuário não encontrado'})
    return
  }

  try {
    await Usuario.deleteOne({_id: id})

    res.status(200).json({message: 'Usuário removido!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

async function checkUserRegistered(req, res) {
  const email = req.params.email
    try {
        const usuario = await Usuario.findOne({email: email})

        if(!usuario){
            res.status(200).json({isUserRegistered: false})
            return
        }

        res.status(200).json({isUserRegistered: true})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  checkUserRegistered,
};