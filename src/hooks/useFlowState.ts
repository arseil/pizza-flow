import { useState, useEffect, useRef } from 'react';
import { Node, Edge } from 'reactflow';
import { serializeState, deserializeState } from '@/utils/stateUtils';
import initialData from '@/data/cards.json';

const STORAGE_KEY = 'flow-state';

export const useFlowState = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const isInitialized = useRef(false);

    // Load state from localStorage on mount
    useEffect(() => {
        if (isInitialized.current) return;

        try {
            const savedState = localStorage.getItem(STORAGE_KEY);

            if (savedState) {
                const parsedState = JSON.parse(savedState);

                const { nodes: deserializedNodes, edges: deserializedEdges } = deserializeState(parsedState, setNodes);

                setNodes(deserializedNodes);
                setEdges(deserializedEdges);
            } else {
                const { nodes: initialNodes, edges: initialEdges } = deserializeState(initialData, setNodes);
                setNodes(initialNodes);
                setEdges(initialEdges);
            }
            isInitialized.current = true;
        } catch (error) {
            const { nodes: initialNodes, edges: initialEdges } = deserializeState(initialData, setNodes);
            setNodes(initialNodes);
            setEdges(initialEdges);
            isInitialized.current = true;
        }
    }, []);

    // Save state to localStorage on changes
    useEffect(() => {
        if (!isInitialized.current) return;


        try {
            const serializedState = serializeState(nodes, edges);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedState));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }, [nodes, edges]);

    const resetFlow = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            const { nodes: initialNodes, edges: initialEdges } = deserializeState(initialData, setNodes);
            setNodes(initialNodes);
            setEdges(initialEdges);
        } catch (error) {
            console.error('Error resetting flow:', error);
        }
    };

    return {
        nodes,
        setNodes,
        edges,
        setEdges,
        resetFlow
    };
}; 