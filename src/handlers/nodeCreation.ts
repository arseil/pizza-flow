import { Node } from 'reactflow';
import { createRichCard, createCarouselContainer, getNextPosition } from '@/utils/cardUtils';

export const createAddRichCardHandler = (
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
    lastPosition: React.RefObject<{ x: number; y: number }>,
    updateNodeHandlers: (node: Node, setNodes: React.Dispatch<React.SetStateAction<Node[]>>) => Node
) => {
    return () => {
        const newNode = createRichCard(
            lastPosition.current,
            () => setNodes((nds: Node[]) => nds.filter((n) => n.id !== newNode.id)),
            (field: 'title' | 'description', value: string) => {
                setNodes((nds: Node[]) =>
                    nds.map((n) =>
                        n.id === newNode.id
                            ? { ...n, data: { ...n.data, [field]: value } }
                            : n
                    )
                );
            },
            (actions: any[]) => {
                setNodes((nds: Node[]) =>
                    nds.map((n) =>
                        n.id === newNode.id
                            ? { ...n, data: { ...n.data, actions } }
                            : n
                    )
                );
            }
        );
        const nodeWithHandlers = updateNodeHandlers(newNode, setNodes);
        setNodes((nds: Node[]) => {
            const updatedNodes = [...nds, nodeWithHandlers];
            return updatedNodes;
        });
        lastPosition.current = getNextPosition(lastPosition.current);
    };
};

export const createAddCarouselCardContainerHandler = (
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
    lastPosition: React.RefObject<{ x: number; y: number }>,
    updateNodeHandlers: (node: Node, setNodes: React.Dispatch<React.SetStateAction<Node[]>>) => Node
) => {
    return () => {
        const newNode = createCarouselContainer(
            lastPosition.current,
            () => setNodes((nds: Node[]) => nds.filter((n) => n.id !== newNode.id)),
            (updatedCards: any[], containerId: string) => {
                setNodes((nds: Node[]) =>
                    nds.map((n) =>
                        n.id === containerId
                            ? { ...n, data: { ...n.data, nodes: updatedCards } }
                            : n
                    )
                );
            }
        );
        const nodeWithHandlers = updateNodeHandlers(newNode, setNodes);
        setNodes((nds: Node[]) => {
            const updatedNodes = [...nds, nodeWithHandlers];
            return updatedNodes;
        });
        lastPosition.current = getNextPosition(lastPosition.current);
    };
}; 