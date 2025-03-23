import { Node } from 'reactflow';

export const updateNodeHandlers = (
    node: Node,
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>
): Node => {
    if (node.type === 'richCard') {
        return {
            ...node,
            data: {
                ...node.data,
                onDelete: () => {
                    setNodes((nds: Node[]) => nds.filter((n) => n.id !== node.id));
                },
                onChange: (field: 'title' | 'description', value: string) => {
                    setNodes((nds: Node[]) =>
                        nds.map((n) =>
                            n.id === node.id
                                ? { ...n, data: { ...n.data, [field]: value } }
                                : n
                        )
                    );
                },
                onActionsChange: (actions: any[]) => {
                    setNodes((nds: Node[]) =>
                        nds.map((n) =>
                            n.id === node.id
                                ? { ...n, data: { ...n.data, actions } }
                                : n
                        )
                    );
                }
            }
        };
    }
    if (node.type === 'carouselCardContainer') {
        return {
            ...node,
            data: {
                ...node.data,
                nodes: node.data.nodes.map((card: any) => ({
                    ...card,
                    data: {
                        ...card.data,
                        onDelete: () => {
                            setNodes((nds: Node[]) => {
                                return nds.map((n) => {
                                    if (n.id === node.id && n.type === 'carouselCardContainer') {
                                        return {
                                            ...n,
                                            data: {
                                                ...n.data,
                                                nodes: n.data.nodes.filter((c: any) => c.id !== card.id),
                                            },
                                        };
                                    }
                                    return n;
                                });
                            });
                        },
                        onChange: (field: 'title' | 'description', value: string) => {
                            setNodes((nds: Node[]) => {
                                return nds.map((n) => {
                                    if (n.id === node.id && n.type === 'carouselCardContainer') {
                                        return {
                                            ...n,
                                            data: {
                                                ...n.data,
                                                nodes: n.data.nodes.map((c: any) =>
                                                    c.id === card.id
                                                        ? { ...c, data: { ...c.data, [field]: value } }
                                                        : c
                                                ),
                                            },
                                        };
                                    }
                                    return n;
                                });
                            });
                        },
                        onActionsChange: (actions: any[]) => {
                            setNodes((nds: Node[]) => {
                                return nds.map((n) => {
                                    if (n.id === node.id && n.type === 'carouselCardContainer') {
                                        return {
                                            ...n,
                                            data: {
                                                ...n.data,
                                                nodes: n.data.nodes.map((c: any) =>
                                                    c.id === card.id
                                                        ? { ...c, data: { ...c.data, actions } }
                                                        : c
                                                ),
                                            },
                                        };
                                    }
                                    return n;
                                });
                            });
                        }
                    }
                })),
                onDelete: () => {
                    setNodes((nds: Node[]) => nds.filter((n) => n.id !== node.id));
                },
                onNodesChange: (updatedCards: any[], containerId: string) => {
                    setNodes((nds: Node[]) =>
                        nds.map((n) =>
                            n.id === containerId
                                ? { ...n, data: { ...n.data, nodes: updatedCards } }
                                : n
                        )
                    );
                }
            }
        };
    }
    return node;
}; 