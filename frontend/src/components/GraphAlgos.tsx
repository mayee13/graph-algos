import { useState } from "react";
import './GraphAlgos.css';

export default function GraphAlgos({ 
    onBackClick,
    nodes,
    runAlgorithm,
    options,
    hasNegativeEdges 
}: { 
    onBackClick: () => void 
    nodes: { id: string }[];
    runAlgorithm: (algorithm: string, start: string) => void;
    options: { directed: boolean; weighted: boolean;  };
    hasNegativeEdges: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState("simple");
  const [startNode, setStartNode] = useState(nodes[0]?.id ?? '');
  // const navigate = useNavigate();
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "simple":
        return <SimpleTraversal />;
      case "shortest":
        return <ShortestPath />;
      case "minimum":
        return <MinimumSpanning />;
      case "other":
        return <Other />;
      default:
        return null;
    }
  };

  return (
    <div className="graph-algos-container">
      {/* Top Select Dropdown */}
      <div>
      <label htmlFor="algoType">Algorithm Type</label>
      <select
        name="algoType"
        id="algoType"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="simple">Simple Traversal</option>
        <option value="shortest">Shortest Path</option>
        <option value="minimum">Minimum Spanning</option>
        <option value="other">Other</option>
      </select>
      </div>
      

      {/* Start Node Selector */}
      <div>
        <label htmlFor="startNode">Start Node</label>
        <select name="startNode" id="startNode" value={startNode} onChange={(e) => setStartNode(e.target.value)}>
        {nodes.map((node) => (
            <option key={node.id} value={node.id}>
            {node.id}
            </option>
        ))}
        </select>
      </div>
      {/* Conditionally Render Algorithm Buttons */}
      {renderSelectedComponent()}
      <div>
        <button className="button-17" onClick={onBackClick}>Back to Editor</button>
      </div>
    </div>
  );

  // Subcomponents
  function SimpleTraversal() {
    return (
      <div>
        <div>
            <label htmlFor="BFS">Breadth First Search</label>
            <button className="button-17" id="BFS" onClick={() =>runAlgorithm('BFS', startNode)}>Run</button>
        </div>
        <div>
            <label htmlFor="DFS">Depth First Search</label>
            <button className="button-17" id="DFS" onClick={() =>runAlgorithm('DFS', startNode)}>Run</button>
        </div>
      </div>
    );
  }

  function ShortestPath() {
    return (
      <div>
        <div>
            <label htmlFor="Dijkstra">Dijkstra</label>
            <button 
                className="button-17" 
                id="Dijkstra" 
                onClick={() =>runAlgorithm('Dijkstra', startNode)} 
                disabled={!options.weighted || hasNegativeEdges}>
                    Run
            </button>
        </div>
        <div>
            <label htmlFor="Bellman">Bellman Ford</label>
            <button 
                className="button-17" 
                id="Bellman" 
                onClick={() =>runAlgorithm('Bellman', startNode)}
                disabled={!options.weighted || !options.directed}>Run</button>
        </div>
      </div>
    );
  }

  function MinimumSpanning() {
    return (
      <div>
        <div>
            <label htmlFor="Prim">Prim's Algorithm</label>
            <button 
                className="button-17" 
                id="Prim" onClick={() =>runAlgorithm('Prim', startNode)} 
                disabled={!options.weighted || options.directed}>Run</button>
        </div>
        <div>
            <label htmlFor="Kruskal">Kruskal's Algorithm</label>
            <button 
                className="button-17" 
                id="Kruskal" onClick={() =>runAlgorithm('Kruskal', startNode)}
                disabled={!options.weighted || options.directed}>Run</button>
        </div>
      </div>
    );
  }

  function Other() {
    return (
      <div>
        <div>
            <label htmlFor="Topological">Topological Sort</label>
            <button className="button-17" id="Topological">
                Run
            </button>
        </div>
        <div>
            <label htmlFor="Ford">Ford Fulkerson</label>
            <button className="button-17" id="Ford">Run</button> 
        </div>
      </div>
    );
  }
}
