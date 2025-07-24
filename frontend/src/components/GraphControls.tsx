import './GraphControls.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// TODO: add feature to generate a random graph after fixing the number of nodes (sparsity parameters?)
export default function GraphControls({ 
  onRunClick,
  setNodeCount,
  addEdge,
  options,
  setOptions,
  nodes,
  setNegativeEdges,  
}: { 
  onRunClick: () => void 
  setNodeCount: (count: number) => void;
  addEdge: (start: string, end: string, weight?: number) => void;
  options: { directed: boolean; weighted: boolean };
  setOptions: (opts: { directed: boolean; weighted: boolean }) => void;
  nodes: { id: string }[];
  setNegativeEdges: (hasNegativeEdges: boolean) => void;
}) {
    return (
        <div className="graph-controls-container">
          <CheckBoxElems options={options} setOptions={setOptions}/>
          <SliderElem setNodeCount={setNodeCount} nodeCount={nodes.length}/>
          <AddEdge addEdge={addEdge} nodes={nodes} options={options} setNegativeEdges={setNegativeEdges}/>
          <BottomButtons onRunClick={onRunClick}/>
        </div>
      );
}

// Render weighted and directed graph options
function CheckBoxElems({ options, setOptions } : any) {
    return (
        <div className="checkbox-container">
          <div className="checkbox-wrapper-1">
            <input 
            type="checkbox" 
            id="weighted" 
            className="substituted" 
            checked={options.weighted}
            onChange={(e) => setOptions({ ...options, weighted: e.target.checked })}></input>
            <label htmlFor="weighted">Weighted</label>
          </div>
          <div className="checkbox-wrapper-1">
            <input 
            type="checkbox" 
            id="directed" 
            className="substituted"
            checked={options.directed}
            onChange={(e) => setOptions({ ...options, directed: e.target.checked })}
            ></input>
            <label htmlFor="directed">Directed</label>
          </div>
        </div>
    )
}

// Render a slider for the number of nodes
function SliderElem({setNodeCount, nodeCount} : { 
  setNodeCount: (count: number) => void;
  nodeCount: number }) {
    return (
        <div className="slider-container">
          <label htmlFor="nodeCount">Number of Nodes: </label>
          <input 
          type="range" 
          min="1" 
          max="26" 
          id="nodeCount"
          value={nodeCount}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setNodeCount(val);
          }}
          className="slider"></input>
          <span className="slider-value">{nodeCount}</span>
        </div>
    )
}

// Render elements to add an edge between two nodes
function AddEdge({
  addEdge,
  nodes,
  options,
  setNegativeEdges,
} : {
  addEdge: (start: string, end: string, weight?: number) => void;
  nodes: { id: string }[];
  options: { directed: boolean; weighted: boolean };
  setNegativeEdges: (hasNegativeEdges: boolean) => void;
}) {
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [weight, setWeight] = useState(1);
    return (
        <div className="edge-editor-container">
          <label htmlFor="startNode">Start: </label>
          <select name="startNode" id="startNode" value={startNode} onChange={(e) => setStartNode(e.target.value)}>
            <option value="">--</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
            {node.id}
            </option>
            ))}
          </select>
          <label htmlFor="endNode">End: </label>
          <select name="endNode" id="endNode" value={endNode} onChange={(e) => setEndNode(e.target.value)}>
            <option value="">--</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
            {node.id}
            </option>
            ))}
          </select>
          <label htmlFor="weight">Weight: </label>
                <input 
                  type="number" 
                  id="weight" 
                  value={weight}
                  name="weight" 
                  onChange={(e) => {
                    setWeight(Number(e.target.value))
                    if (Number(e.target.value) < 0) {
                      setNegativeEdges(true); 
                    }
                  }}
                  disabled={!options.weighted}> 
            </input>
            {/* {options.weighted && (
              <>
                
              </>            
            )} */}
            <button className="button-17"
            onClick={() => {
              if ((startNode && endNode) && (startNode !== endNode)) {
                addEdge(startNode, endNode, options.weighted ? weight : undefined);
                if (options.weighted) setWeight(1);
              } else {
                alert('Please select both start and end nodes.');
              }
            }}>Add Edge</button>
        </div>
    )
}

// Render buttons for various actions
function BottomButtons({ onRunClick }: { onRunClick: () => void }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button className="button-17">Generate</button>
        <button className="button-17" onClick={onRunClick}>Run </button>
        <button className="button-17">Save</button>
        <button
        className="button-17"
        onClick={() => navigate('/savedgraphs')}
      >Load</button>
      </div>
      {/* <div><button className="button-17" onClick={() => navigate('/')}>Back to Login</button></div> */}
    </div>
  )
}

