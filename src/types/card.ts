export interface Action {
    id: string;
    type: string | null;
}

export interface RichCardData {
    title: string;
    description: string;
    actions?: Action[];
    onDelete?: () => void;
    onChange?: (field: 'title' | 'description', value: string) => void;
    onActionsChange?: (actions: Action[]) => void;
}

export interface CarouselCard {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    width: number;
    height: number;
    data: RichCardData;
}

export interface CarouselCardContainerData {
    nodes: CarouselCard[];
    onDelete?: () => void;
    onNodesChange?: (updatedCards: CarouselCard[], containerId: string) => void;
}

export interface RichCardProps {
    data: RichCardData;
    currentCard?: number;
    totalCards?: number;
} 