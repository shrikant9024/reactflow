import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import ContextMenu from "./ContextMenu.jsx";

import defaultNodes from "./nodes.js";
import defaultEdges from "./edges.js";

const edgeOptions = {
  style: {
    stroke: "white",
  },
};

const connectionLineStyle = { stroke: "white" };

let nodeId = 0;

function Flow() {
  const [menu, setMenu] = useState(null);
  const reactFlowInstance = useReactFlow();
  const ref = useRef(null);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      if (ref.current) {
        const pane = ref.current.getBoundingClientRect();
        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right:
            event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
            event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      }
    },
    [setMenu]
  );

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ReactFlow
        className="w-full h-full"
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        style={{
          backgroundColor: "#D3D2E5",
        }}
      >
        <button
          onClick={onClick}
          className=" bg-blue-500 p-3 px-4 text-lg rounded-lg text-white "
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "9999",
          }}
        >
          Create a Node
        </button>
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
