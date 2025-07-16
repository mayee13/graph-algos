import { Graph } from './graphBuild';
import { Link } from '../types/graph';

class UnionFind {
    private parent: Map<string, string>;
    private rank: Map<string, number>;

    constructor(nodes: string[]) {
        this.parent = new Map();
        this.rank = new Map();
        for (const node of nodes) {
            this.parent.set(node, node);
            this.rank.set(node, 0);
        }
    }

    find(node: string): string {
        if (this.parent.get(node) !== node) {
            this.parent.set(node, this.find(this.parent.get(node)!));
        }
        return this.parent.get(node)!;
    }

    union(node1: string, node2: string): boolean {
        const root1 = this.find(node1);
        const root2 = this.find(node2);

        if (root1 === root2) return false;

        if (this.rank.get(root1)! < this.rank.get(root2)!) {
            this.parent.set(root1, root2);
        } else if (this.rank.get(root1)! > this.rank.get(root2)!) {
            this.parent.set(root2, root1);
        } else {
            this.parent.set(root2, root1);
            this.rank.set(root1, this.rank.get(root1)! + 1);
        }
        return true;
    }
}

export function kruskal(graph: Graph, start: string) : { nodeOrder: string[], edgeOrder: Link[] } {
    const visitedOrder: {nodeOrder: string[], edgeOrder: Link[]} = {nodeOrder: [], edgeOrder: []};
    const uf = new UnionFind(Array.from(graph.keys()));

    const edges : Link[] = [];
    for (const node of Array.from(graph.keys())) {
        const neighbors = graph.get(node);
        if (!neighbors) continue;
      
        for (const neighbor of neighbors) {
          edges.push({
            source: node,
            target: neighbor.node,
            weight: neighbor.weight,
          });
        }
    }
    edges.sort((a, b) => (a.weight ?? 1) - (b.weight ?? 1));

    for (const edge of edges) {
        if (uf.union(edge.source, edge.target)) {
            visitedOrder.edgeOrder.push(edge);
            // if (!visitedOrder.nodeOrder.includes(edge.source)) {
            //     visitedOrder.nodeOrder.push(edge.source);
            // }
            // if (!visitedOrder.nodeOrder.includes(edge.target)) {
            //     visitedOrder.nodeOrder.push(edge.target);
            // }
            if (edges.length === Array.from(graph.keys()).length - 1) break;
        }
    }
    return visitedOrder; 
}