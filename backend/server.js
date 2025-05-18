const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Initialize tasks in app.locals
app.locals.tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(app.locals.tasks);
});

app.post('/api/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    const newTask = { id: app.locals.tasks.length + 1, task };
    app.locals.tasks.push(newTask);
    res.json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    app.locals.tasks = app.locals.tasks.filter(task => task.id !== id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});

module.exports = app; // Export for testing