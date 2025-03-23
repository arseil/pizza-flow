import { Node, NodeChange, OnNodesChange, Edge, EdgeChange, OnEdgesChange } from 'reactflow';

export const createNodesChangeHandler = (setNodes: React.Dispatch<React.SetStateAction<Node[]>>): OnNodesChange => {
    return (changes: NodeChange[]) => {
        setNodes((nds: Node[]) => {
            return nds.map((node: Node) => {
                const change = changes.find((c) => 'id' in c && c.id === node.id);
                if (change) {
                    if (change.type === 'position' && change.position) {
                        return { ...node, position: change.position };
                    }
                    if (change.type === 'remove') {
                        return null;
                    }
                }
                return node;
            }).filter((node): node is NonNullable<typeof node> => node !== null);
        });
    };
};

export const createEdgesChangeHandler = (setEdges: React.Dispatch<React.SetStateAction<Edge[]>>): OnEdgesChange => {
    return (changes: EdgeChange[]) => {
        setEdges((eds: Edge[]) => {
            return eds.filter((edge: Edge) => {
                const change = changes.find((c) => 'id' in c && c.id === edge.id);
                if (change && 'type' in change && change.type === 'remove') {
                    return false;
                }
                return true;
            }).map((edge: Edge) => {
                const change = changes.find((c) => 'id' in c && c.id === edge.id);
                if (change) {
                    return { ...edge, ...change };
                }
                return edge;
            });
        });
    };
}; 