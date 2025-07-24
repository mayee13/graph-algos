import { Graph } from '../algorithm/graphBuild';

export function graphToObject(graph: Graph): Record<string, { node: string; weight?: number }[]> {
    const obj: Record<string, { node: string; weight?: number }[]> = {};
    for (const [node, neighbors] of graph.entries()) {
        obj[node] = neighbors;
    }
    return obj;
}

// may need the reverse function 