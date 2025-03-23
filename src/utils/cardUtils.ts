import { Node } from 'reactflow';
import { CarouselCard } from '@/types/card';

const INITIAL_POSITION = { x: 100, y: 100 };
const OFFSET = 100;

export const createRichCard = (position: { x: number; y: number }, onDelete: () => void, onChange: (field: 'title' | 'description', value: string) => void, onActionsChange: (actions: any[]) => void): Node => ({
    id: `rich-card-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    type: 'richCard',
    position,
    width: 350,
    height: 615,
    data: {
        title: 'New Rich Card',
        description: 'Description',
        actions: [],
        onDelete,
        onChange,
        onActionsChange
    }
});

export const createCarouselCard = (containerId: string): CarouselCard => ({
    id: `carousel-card-${containerId}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    type: 'carouselCard',
    position: { x: 0, y: 0 },
    width: 350,
    height: 615,
    data: {
        title: '',
        description: '',
        actions: []
    }
});

export const createCarouselContainer = (position: { x: number; y: number }, onDelete: () => void, onNodesChange: (updatedCards: CarouselCard[], containerId: string) => void): Node => {
    const containerId = `carousel-container-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const card1 = createCarouselCard(containerId);
    const card2 = createCarouselCard(containerId);

    return {
        id: containerId,
        type: 'carouselCardContainer',
        position,
        width: 756,
        height: 615,
        data: {
            nodes: [card1, card2],
            onDelete,
            onNodesChange
        }
    };
};

export const getNextPosition = (currentPosition: { x: number; y: number }) => ({
    x: currentPosition.x + OFFSET,
    y: currentPosition.y + OFFSET
});

export { INITIAL_POSITION, OFFSET }; 