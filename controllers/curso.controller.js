const Curso = require('../models/curso.model');

async function createCurso(req, res) {
  const {
    nome,
    duracao,
    modalidade,
    nivel,
    cargaHoraria,
  } = req.body

    const curso = {
      nome,
      duracao,
      modalidade,
      nivel,
      cargaHoraria,
    }

    try {

        const cursoExistente = await Curso.findOne({nome: nome})

        if(cursoExistente){
            res.status(200).json({message: 'Curso já cadastrado'})
            return
        }

        const cursoSaved = await Curso.create(curso)

        res.status(201).json({message: 'Curso inserido com sucesso', curso: cursoSaved})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getCursos(req, res) {
  try {
    const cursos = await Curso.find()

    res.status(200).json(cursos)
  } catch (error) {
      res.status(500).json({error: error})
  }
}

async function getCursoById(req, res) {
  const id = req.params.id
    try {
        const curso = await Curso.findOne({_id: id})

        if(!curso){
            res.status(422).json({message: 'Curso não encontrado'})
            return
        }

        res.status(200).json(curso)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateCurso(req, res) {
  const id = req.params.id

  const {
    nome,
    duracao,
    modalidade,
    nivel,
    cargaHoraria,
  } = req.body

    const curso = {
      nome,
      duracao,
      modalidade,
      nivel,
      cargaHoraria,
    }
    
    try {
        const updatedCurso = await Curso.updateOne({_id: id}, curso)

        if(updatedCurso.matchedCount === 0){
            res.status(422).json({message: 'Curso não encontrado'})
            return
        }

        res.status(200).json(curso)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteCurso(req, res) {
  const id = req.params.id

  const curso = await Curso.findOne({_id: id})

  if(!curso){
    res.status(422).json({message: 'Curso não encontrado'})
    return
  }

  try {
    await Curso.deleteOne({_id: id})

    res.status(200).json({message: 'Curso removido!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

module.exports = {
  createCurso,
  getCursos,
  getCursoById,
  updateCurso,
  deleteCurso,
};