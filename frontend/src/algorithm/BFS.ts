import { Graph } from './graphBuild';
import { Link } from '../types/graph';

export function bfs(graph: Graph, start: string) : { nodeOrder: string[], edgeOrder: Link[] } {
    const visited = new Set<string>();
    const queue: { node: string, parent?: string }[] = [{ node: start }];
    const visitedOrder : {nodeOrder: string[], edgeOrder: Link[]} = {nodeOrder: [], edgeOrder: []};
    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift()!;
        visitedOrder.nodeOrder.push(node.node);
        if (node.parent !== undefined) {
            visitedOrder.edgeOrder.push({source: node.parent, target: node.node});
        }        
        for (const neighbor of graph.get(node.node)!) {
            if (!visited.has(neighbor.node)) {
                visited.add(neighbor.node);
                queue.push({node: neighbor.node, parent: node.node});
            }
        }
    }
    return visitedOrder;
}