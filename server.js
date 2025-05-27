const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
// middleware para pemitir extarir payload dos requests em json

app.use(express.json());

const PORT = 3000;

const MONGO_URI = 'mongodb+srv://pmoreira:pmoreira@pmongo.7wrtx.mongodb.net/?retryWrites=true&w=majority&appName=pmongo';
const DB_NAME = 'academicso';


// Ligação à base de dados
let db, alunosCollection, cursosCollection;

MongoClient.connect(MONGO_URI)
    .then(client => {
        db = client.db(DB_NAME);
        alunosCollection = db.collection('alunos');
        cursosCollection = db.collection('cursos');
        app.listen(PORT, () => {
            console.log(`Servidor a correr em http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));


        

app.get("/", async (req, res) => {
    res.send("Olá Turma B de PW");
})

// rotas de alunos

app.get("/alunos", async (req, res) => {
    alunos = await alunosCollection.find().toArray();
    //console.log(alunos);
    res.json(alunos);
})

// rotas de cursos
// todos os cursos
app.get("/cursos", async (req, res) => {
    cursos = await db.collection("cursos").find().toArray();
    //console.log(cursos);
    res.json(cursos);
})



// curso por id
app.get("/cursos/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);
    curso = await db.collection("cursos").findOne({ "id": id });
    if (curso) {
        res.status(200).json(curso);
    } else {
        res.status(404).json({"erro":"curso não existente"})
    }
})

// criar um curso
app.post("/cursos", async (req, res) => {
    let novocurso = req.body;
    resultado = cursosCollection.insertOne(novocurso);
    let novocursoId = {"_id": resultado.insertedId, ... novocurso}
    console.log(novocursoId);
    res.json(novocursoId);
})

