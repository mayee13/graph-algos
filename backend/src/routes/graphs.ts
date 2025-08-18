import express from 'express';
import { graphs } from '../data/graphs';
import { users } from '../data/users';
import { Graph } from '../types/graph';

const router = express.Router();
router.post('/', (req, res) => {
    const { username, name, data, directed, weighted } = req.body;  

    if (!username || !data) {
        return res.status(400).json({ error: 'Username and data are required' });
    }

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    if (graphs.some(graph => graph.username === username && graph.name === name)) {
        const index = graphs.findIndex(graph => graph.username === username && graph.name === name);
        graphs[index] = {
            ...graphs[index],
            data,
            directed: directed !== undefined ? directed : graphs[index].directed,
            weighted: weighted !== undefined ? weighted : graphs[index].weighted
        };
        console.log(`Graph with name ${name} already exists. Updating the existing graph.`);
        return res.status(200).json({ message: 'Graph updated successfully', graph: graphs[index] });
    }

    const maxId = graphs.reduce((max, g) => Math.max(max, typeof g.id === 'number' ? g.id : 0), 0);
    const newId = maxId + 1;
    const newGraph: Graph = {
        id: newId,
        username: user.username,
        name: name || `Graph ${graphs.length + 1}`,
        data,
        directed: directed,
        weighted: weighted
    };

    graphs.push(newGraph);
    return res.status(200).json({ message: 'Graph saved successfully', graph: newGraph });
});

router.get('/', (req, res) => {
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const userGraphs = graphs.filter(graph => graph.username === username);
    return res.status(200).json(userGraphs);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = graphs.findIndex(graph => graph.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Graph not found' });
    }

    const deletedGraph = graphs.splice(index, 1)[0];
    return res.status(200).json({ message: 'Graph deleted successfully', graph: deletedGraph });
});

export default router;