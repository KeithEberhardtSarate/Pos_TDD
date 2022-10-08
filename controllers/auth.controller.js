const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');


async function register(req, res) {
  const {
    name,
    email,
    password
  } = req.body

    const user = {
      name,
      email,
      password
    }

    if(!name){
      return res.status(422).json({message: 'Nome é obrigatório'})
    }
    if(!email){
      return res.status(422).json({message: 'Email é obrigatório'})
    }

    try {

        const persistedUser = await Usuario.findOne({email: email})

        if(persistedUser){
            res.status(422).json({message: 'Usuário já possui cadastro'})
            return
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;

        const userSaved = await Usuario.create(user)

        res.status(201).json({message: 'Usuário inserido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function login(req, res) {  
  const {
    email,
    password,
  } = req.body 

  if(!email){
    res.status(422).json({message: 'Email é obrigatório'})
  }

    try {

        const persistedUser = await Usuario.findOne({email: email})

        if(!persistedUser){
            res.status(402).json({message: 'Usuário não possui cadastro'})
            return
        }

        const checkPassword = await bcrypt.compare(password, persistedUser.password);

        if(!checkPassword){
          res.status(401).json({message: 'Usuário ou senha inválidos'})
          return
        }

        const secret =  process.env.SECRET;

        const token = jwt.sign({
          id: persistedUser._id
        }, secret,)

        res.status(200).json({message: 'Autenticação realizada com sucesso', token})

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
  register,
  login
};