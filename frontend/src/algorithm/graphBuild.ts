import { Node, Link } from '../types/graph';

export type Graph = Map<string, { node: string; weight?: number }[]>;

export function buildGraph(
    nodes: string[], 
    links: Link[],
    directed: boolean
): Graph {
  const graph: Graph = new Map();

  // Initialize graph with nodes
  for (const node of nodes) {
    graph.set(node, []);
  }

  // Add edges to the graph
  for (const link of links) {
    const getId = (n: string | Node): string =>
      typeof n === "string" ? n : n.id;

    const source = getId(link.source);
    const target = getId(link.target);
    const weight = link.weight;

    graph.get(source)!.push({
      node: target,
      ...(weight !== undefined ? { weight } : {}),
    });

    // Add the reverse edge if the graph is undirected
    if (!directed) {
      graph.get(target)!.push({
        node: source,
        ...(weight !== undefined ? { weight } : {}),
      });
    }
  }
  return graph;
}