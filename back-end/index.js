const { log } = require('console')
const express = require("express")
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Youssef Says Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note)
        response.json(note);
    else
        response.status(400).end()
})

app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id)
    console.log(notes)

    res.status(204).end();
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
}

app.post("/api/notes", (req, res) => {
    const body = req.body;

    if (!body.content)
        return res.status(400).json({error: "content missing"})

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }
    
    notes = notes.concat(note);
    res.json(note);
})

app.put("/api/notes/:id", (req, res) => {
    const newNote = req.body;

    if (!newNote.content && !newNote.important)
        return res.status(400).json({error: "content missing"});

    notes = notes.map(note => note.id !== newNote.id ? note : newNote);
    res.json(newNote);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))