import { Graph } from './graphBuild';
import { Link } from '../types/graph';

export function prim(graph: Graph, start: string) : { nodeOrder: string[], edgeOrder: Link[] } {
    const visitedOrder: {nodeOrder: string[], edgeOrder: Link[]} = {nodeOrder: [], edgeOrder: []};
    const visited = new Set<String>();
    const queue : { node: string, parent?: string, weight: number }[] = [{ node: start, weight: 0 }];

    while (queue.length > 0) {
        queue.sort((a, b) => a.weight - b.weight);
        const current = queue.shift()!;

        if (visited.has(current.node)) continue;

        visited.add(current.node);
        visitedOrder.nodeOrder.push(current.node);
        if (current.parent !== undefined) {
            visitedOrder.edgeOrder.push({source: current.parent, target: current.node});
        }
        
        for (const neighbor of graph.get(current.node)!) {
            if (!visited.has(neighbor.node)) {
                queue.push({node: neighbor.node, parent: current.node, weight: (neighbor.weight ?? 1)});
            }
        }
    }
    return visitedOrder; 
}