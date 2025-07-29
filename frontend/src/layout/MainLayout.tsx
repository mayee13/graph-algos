import { useState } from 'react';
import GraphCanvas from '../components/GraphCanvas';
import GraphControls from '../components/GraphControls';
import GraphAlgos from '../components/GraphAlgos';
import './MainLayout.css';
import { Node, Link } from '../types/graph';
import { Graph, buildGraph } from '../algorithm/graphBuild';
import { bfs } from '../algorithm/BFS';
import { dfs } from '../algorithm/DFS';
import { dijkstra } from '../algorithm/dijkstra';
import { prim } from '../algorithm/prim';
import { kruskal } from '../algorithm/kruskal';
import { bellman } from '../algorithm/bellman';
import { saveGraph } from '../api/graphs';
import { useEffect } from 'react';

export default function MainLayout({ 
  user: username, 
  graph: graphname, 
  setGraphName, 
  graphInfo: graphdata, 
  options,
  setOptions 
}: { 
  user: 
  string, 
  graph: string, 
  setGraphName: (name: string) => void, 
  graphInfo: Graph | null,
  options: { directed: boolean; weighted: boolean },
  setOptions: (options: { directed: boolean; weighted: boolean }) => void }) {

  // const [graphName, setGraphName] = useState<string>('');
  // Initial state shows graph controls
  const [showAlgos, setShowAlgos] = useState(false);

  // Single node initially
  const [nodes, setNodes] = useState<Node[]>([
    {id: 'A'}
  ]);

  useEffect(() => {
    if (graphdata) {
      const newNodes: Node[] = Array.from(graphdata.keys()).map((key) => ({
        id: key
      }));
      setNodes(newNodes);
    }
  }, [graphdata]);

  // Links are empty initially
  const [links, setLinks] = useState<Link[]>([]);
  useEffect(() => {
    if (graphdata) {
      const newLinks: Link[] = [];
  
      for (const [source, neighbors] of graphdata.entries()) {
        for (const { node: target, weight } of neighbors) {
          newLinks.push({ source, target, weight });
        }
      }
  
      setLinks(newLinks);
    }
  }, [graphdata]);

  // TODO: save this information in the database
  // Options for the graph type
  // const [options, setOptions] = useState({
  //   directed: false,
  //   weighted: false,
  // });

  // Set order of visited nodes for algorithms
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);

  const [visitedEdges, setVisitedEdges] = useState<Link[]>([]);

  const [hasNegativeEdges, setHasNegativeEdges] = useState(false);

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
        case 'Dijkstra':
          visitedOrder = dijkstra(graph, start);
          break;
        case 'Prim':
          visitedOrder = prim(graph, start);
          break;
        case 'Kruskal':
          visitedOrder = kruskal(graph, start);
          break;
        case 'Bellman':
          visitedOrder = bellman(graph, start);  
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
    setVisitedEdges([]); // Reset visited edges when going back
  }

  const clearColors = () => { 
    setVisitedNodes([]);
    setVisitedEdges([]);
  }

  const saveGraphToDB = async () => {
    const graph : Graph = buildGraph(nodes.map((node) => node.id), links, options.directed);
    if (username === "" || graphname === "") {
      alert('Please login and provide a graph name before saving.');
      return; 
    }
    try {
      await saveGraph(username, graphname, graph, options.directed, options.weighted);
      alert('Graph saved successfully!');
    } catch (error) {
      console.error('Error saving graph:', error);
      alert('Failed to save graph. Please try again.');
    }
  }

  return (
    <div>
      <div className="main-layout">
        <div className="item">
          {showAlgos ? (
            <GraphAlgos 
            onBackClick={onBackClick}
            nodes={nodes}
            runAlgorithm={runAlgorithm}
            options={options}
            hasNegativeEdges={hasNegativeEdges}
            clearColors={clearColors}
            />
          ) : (
            <GraphControls 
            onRunClick={() => setShowAlgos(true)} 
            setNodeCount={setNodeCount}
            addEdge={addEdge}
            options={options}
            setOptions={setOptions}
            nodes={nodes}
            setNegativeEdges={setHasNegativeEdges}
            graphName={graphname}
            setGraphName={setGraphName}
            saveGraphToDB={saveGraphToDB}
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

