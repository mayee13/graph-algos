import { Graph } from '../algorithm/graphBuild';
import { graphToObject } from './utils';

export async function saveGraph(username: string, name: string, graph: Graph) {
    const graphData = graphToObject(graph);
    const response = await fetch('/api/graphs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, data: graphData }),
    });

    if (!response.ok) {
        throw new Error('Failed to save graph');
    }
    return response.json();
}

export async function fetchGraphs(username: string) {
    const response = await fetch(`/api/graphs?username=${encodeURIComponent(username)}`);

    if (!response.ok) {
        throw new Error('Failed to fetch graphs');
    }
    return response.json();
}

export async function deleteGraph(id: number) {
    const response = await fetch(`/api/graphs/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete graph');
    }
    return response.json();
}