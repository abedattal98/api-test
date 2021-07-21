const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }

]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/courses', (req, res) => {
    res.json(courses)
})
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('This course is not available!')
    res.json(course)
})
app.get('/api/courses/:id/:child', (req, res) => {
    res.json(req.params)
})
app.post('/api/courses', (req, res) => {
    if(!req.body.name||req.body.name.length<3){
        res.status(400).send('Name should be long')
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    console.log(course)

    courses.push(course)
    console.log("hi" + courses)

    res.json((course))
})
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('This course is not available!') 
    course.name = req.body.name
    res.json(course)
})
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('This course is not available!') 
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.json(course)
})
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})