import { Graph } from '../algorithm/graphBuild';

export function graphToObject(graph: Graph): Record<string, { node: string; weight?: number }[]> {
    const obj: Record<string, { node: string; weight?: number }[]> = {};
    for (const [node, neighbors] of graph.entries()) {
        obj[node] = neighbors;
    }
    return obj;
}

export function objectToGraph(obj: Record<string, { node: string; weight?: number }[]>): Graph {
    const graph: Graph = new Map();
    for (const [node, neighbors] of Object.entries(obj)) {
        graph.set(node, neighbors);
    }
    return graph;
}

// export function objectToGraph(obj: Record<string, { node: string; weight?: number }[]>): Graph {
//     return new Map(Object.entries(obj));
// }

// may need the reverse function 