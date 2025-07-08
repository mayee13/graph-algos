import { useState } from 'react';
import Header from '../components/Header';
import GraphCanvas from '../components/GraphCanvas';
import GraphControls from '../components/GraphControls';
import GraphAlgos from '../components/GraphAlgos';
import './MainLayout.css';
import { Node, Link } from '../types/graph';
import { Graph, buildGraph } from '../algorithm/graphBuild';
import { bfs } from '../algorithm/BFS';
import { dfs } from '../algorithm/DFS';

export default function MainLayout() {
  // Initial state shows graph controls
  const [showAlgos, setShowAlgos] = useState(false);

  // Single node initially
  const [nodes, setNodes] = useState<Node[]>([
    {id: 'A'}
  ]);

  // Links are empty initially
  const [links, setLinks] = useState<Link[]>([]);

  // Options for the graph type
  const [options, setOptions] = useState({
    directed: false,
    weighted: false,
  });

  // Set order of visited nodes for algorithms
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);

  const [visitedEdges, setVisitedEdges] = useState<Link[]>([]);

  // GraphControls: Function to set the number of nodes and delete any 
  // links that reference non-existent nodes
  const setNodeCount = (count: number) => {
    const newNodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const char = String.fromCharCode(65 + i); 
      newNodes.push({ id: char });
    }
    setNodes(newNodes);
    const validIds = new Set(newNodes.map((n) => n.id));
    setLinks((prev) =>
      prev.filter((link) => validIds.has(link.source) && validIds.has(link.target))
    );
  }

  // GraphControls: Function to add an edge between two nodes
  const addEdge = (start: string, end: string, weight?: number) => {
    const newEdge : Link = {
      source: start,
      target: end,
    };
    if (options.weighted) {
      newEdge.weight = weight;
    }
    setLinks((prev) => [...prev, newEdge]);
  }

  const runAlgorithm = (
    algorithm: string,
    start: string,
  ) => {
    const graph : Graph = buildGraph(nodes.map((node) => node.id), links, options.directed);
    let visitedOrder: {nodeOrder: string[], edgeOrder: Link[]} = {nodeOrder: [], edgeOrder: []};
    setVisitedNodes([]); // Reset visited nodes before running algorithm
    setTimeout(() => {
      switch (algorithm) {
        case 'BFS':
          visitedOrder = bfs(graph, start);
          break;
        case 'DFS':
          visitedOrder = dfs(graph, start);
          break;
        default:
          console.error('Unknown algorithm:', algorithm);
          return;
      }      
      setVisitedNodes(visitedOrder.nodeOrder);
      setVisitedEdges(visitedOrder.edgeOrder);
    }, 1000);
    setVisitedNodes(visitedOrder.nodeOrder);
    setVisitedEdges(visitedOrder.edgeOrder);
  }

  const onBackClick = () => {
    setShowAlgos(false);
    setVisitedNodes([]); // Reset visited nodes when going back
  }

  return (
    <div>
      <Header />
      <div className="main-layout">
        <div className="item">
          {showAlgos ? (
            <GraphAlgos 
            onBackClick={onBackClick}
            nodes={nodes}
            runAlgorithm={runAlgorithm}
            />
          ) : (
            <GraphControls 
            onRunClick={() => setShowAlgos(true)} 
            setNodeCount={setNodeCount}
            addEdge={addEdge}
            options={options}
            setOptions={setOptions}
            nodes={nodes}
            />
          )}
        </div>
      <div className="item">
          <GraphCanvas nodes={nodes} links={links} options={options} visitedNodes={visitedNodes} visitedEdges={visitedEdges}/>
      </div>
  </div>

    </div>
  );
}

