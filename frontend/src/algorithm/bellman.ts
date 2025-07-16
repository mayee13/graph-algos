import { Graph } from './graphBuild';
import { Link } from '../types/graph';

export function bellman(graph: Graph, start: string) : { nodeOrder: string[], edgeOrder: Link[] } {
    const visitedOrder: {nodeOrder: string[], edgeOrder: Link[]} = {nodeOrder: [], edgeOrder: []};
    const distance = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const pathTo = new Map<string, string[]>();

    // console.log(graph)
    for (const node of Array.from(graph.keys())) {
        distance.set(node, Infinity);
        previous.set(node, null);
        pathTo.set(node, []);
    }
    distance.set(start, 0);
    pathTo.set(start, [start]);
    visitedOrder.nodeOrder.push(start);
    const nodes = Array.from(graph.keys());
    const dummyNode = '_'; 
    const dummyEdge = {
        source: dummyNode,
        target: dummyNode,
    }

    for (let i = 0; i < nodes.length - 1; i++) {
        for (const node of nodes) {
            const neighbors = graph.get(node);
            if (!neighbors) continue;

            for (const neighbor of neighbors) {
                const newDistance = distance.get(node)! + (neighbor.weight ?? 1);
                if (newDistance < distance.get(neighbor.node)!) {
                    distance.set(neighbor.node, newDistance);
                    previous.set(neighbor.node, node);
                    const currentPath = pathTo.get(node) ?? [];
                    pathTo.set(neighbor.node, [...currentPath, neighbor.node]);
                }
                for (let j = 1; j < pathTo.get(neighbor.node)!.length; j++) {
                    visitedOrder.nodeOrder.push(pathTo.get(neighbor.node)![j]);
                    visitedOrder.edgeOrder.push({
                        source: pathTo.get(neighbor.node)![j - 1],
                        target: pathTo.get(neighbor.node)![j],
                    });
                } 
                
            }
        }
        if (i !== nodes.length - 2) {
            visitedOrder.nodeOrder.push(dummyNode);
            visitedOrder.edgeOrder.push(dummyEdge);
        }
    }
    // console.log(visitedOrder); 
    // console.log(pathTo);

    return visitedOrder
}