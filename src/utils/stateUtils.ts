import { Node, Edge } from 'reactflow';
import { CarouselCard } from '@/types/card';

export const serializeNode = (node: Node): Node => {
    if (node.type === 'richCard') {
        const serialized = {
            ...node,
            data: {
                title: node.data.title,
                description: node.data.description,
                actions: node.data.actions || []
            }
        };
        return serialized;
    }
    if (node.type === 'carouselCardContainer') {
        const serialized = {
            ...node,
            data: {
                nodes: node.data.nodes.map((card: CarouselCard) => ({
                    ...card,
                    data: {
                        title: card.data.title,
                        description: card.data.description,
                        actions: card.data.actions || []
                    }
                }))
            }
        };
        return serialized;
    }
    return node;
};

export const serializeState = (nodes: Node[], edges: Edge[]) => {
    const serialized = {
        nodes: nodes.map(serializeNode),
        edges
    };
    return serialized;
};

export const deserializeNode = (node: Node, setNodes: (updater: (nodes: Node[]) => Node[]) => void): Node => {
    if (node.type === 'richCard') {
        const deserialized = {
            ...node,
            data: {
                ...node.data,
                actions: node.data.actions || [],
                onDelete: () => {
                    setNodes((nds) => nds.filter((n) => n.id !== node.id));
                },
                onChange: (field: 'title' | 'description', value: string) => {
                    setNodes((nds) =>
                        nds.map((n) =>
                            n.id === node.id
                                ? { ...n, data: { ...n.data, [field]: value } }
                                : n
                        )
                    );
                },
                onActionsChange: (actions: any[]) => {
                    setNodes((nds) =>
                        nds.map((n) =>
                            n.id === node.id
                                ? { ...n, data: { ...n.data, actions } }
                                : n
                        )
                    );
                }
            }
        };
        return deserialized;
    }
    if (node.type === 'carouselCardContainer') {
        const deserialized = {
            ...node,
            data: {
                ...node.data,
                nodes: node.data.nodes.map((card: CarouselCard) => ({
                    ...card,
                    data: {
                        ...card.data,
                        actions: card.data.actions || [],
                        onDelete: () => {
                            setNodes((nds) => {
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
                            setNodes((nds) => {
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
                            setNodes((nds) => {
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
                    setNodes((nds) => nds.filter((n) => n.id !== node.id));
                },
                onNodesChange: (updatedCards: CarouselCard[], containerId: string) => {
                    setNodes((nds) =>
                        nds.map((n) =>
                            n.id === containerId
                                ? { ...n, data: { ...n.data, nodes: updatedCards } }
                                : n
                        )
                    );
                }
            }
        };
        return deserialized;
    }
    return node;
};

export const deserializeState = (state: { nodes: Node[]; edges: Edge[] }, setNodes: (updater: (nodes: Node[]) => Node[]) => void) => {
    const deserialized = {
        nodes: state.nodes.map(node => deserializeNode(node, setNodes)),
        edges: state.edges
    };
    return deserialized;
}; 