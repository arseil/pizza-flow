import { useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Connection,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from "@/components/ui/shadcn/button";

import { RichCard } from '@/components/nodes/RichCard';
import { CarouselCardContainer } from '@/components/nodes/CarouselCardContainer';
import { useFlowState } from '@/hooks/useFlowState';
import { INITIAL_POSITION } from '@/utils/cardUtils';
import { updateNodeHandlers } from '@/handlers/nodeHandlers';
import { createNodesChangeHandler, createEdgesChangeHandler } from '@/handlers/changeHandlers';
import { createAddRichCardHandler, createAddCarouselCardContainerHandler } from '@/handlers/nodeCreation';

const nodeTypes = {
  richCard: RichCard,
  carouselCardContainer: CarouselCardContainer,
};

function App() {
  const { nodes, setNodes, edges, setEdges, resetFlow } = useFlowState();
  const lastPosition = useRef<{ x: number; y: number }>(INITIAL_POSITION);

  const onNodesChange = useCallback(
    createNodesChangeHandler(setNodes),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    createEdgesChangeHandler(setEdges),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  const addRichCard = useCallback(
    createAddRichCardHandler(setNodes, lastPosition, updateNodeHandlers),
    [setNodes]
  );

  const addCarouselCardContainer = useCallback(
    createAddCarouselCardContainerHandler(setNodes, lastPosition, updateNodeHandlers),
    [setNodes]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: '#f8f9fa' }}
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Button variant="link" onClick={addRichCard}>
          Card
        </Button>
        <Button variant="link" onClick={addCarouselCardContainer}>
          Carousel
        </Button>
        <Button variant="link" onClick={resetFlow}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
