import { NodeProps } from 'reactflow';
import { RichCard } from './RichCard';
import { CarouselCardContainerData } from '@/types/card';
import { AddCardButton } from '@/components/ui/AddCardButton';

export function CarouselCardContainer({ data, id }: NodeProps<CarouselCardContainerData>) {
    const carouselCards = data.nodes;
    const totalCards = carouselCards.length;

    const addCard = (afterCardId: string) => {

        const cardIndex = carouselCards.findIndex(card => card.id === afterCardId);

        const newCard = {
            id: `carousel-card-${Date.now()}-${cardIndex}`,
            type: 'carouselCard',
            position: { x: 0, y: 0 },
            width: 350,
            height: 615,
            data: {
                title: '',
                description: '',
                actions: [],
                onDelete: () => {
                    const updatedNodes = carouselCards.filter(n => n.id !== newCard.id);
                    if (data.onNodesChange) {
                        data.onNodesChange(updatedNodes, id);
                    }
                },
                onChange: (field: 'title' | 'description', value: string) => {
                    const updatedNodes = carouselCards.map(n =>
                        n.id === newCard.id
                            ? { ...n, data: { ...n.data, [field]: value } }
                            : n
                    );
                    if (data.onNodesChange) {
                        data.onNodesChange(updatedNodes, id);
                    }
                },
                onActionsChange: (actions: any[]) => {
                    const updatedNodes = carouselCards.map(n =>
                        n.id === newCard.id
                            ? { ...n, data: { ...n.data, actions } }
                            : n
                    );
                    if (data.onNodesChange) {
                        data.onNodesChange(updatedNodes, id);
                    }
                }
            }
        };

        const updatedNodes = [...carouselCards];
        updatedNodes.splice(cardIndex + 1, 0, newCard);

        if (data.onNodesChange) {
            data.onNodesChange(updatedNodes, id);
        }
    };

    return (
        <div className="flex items-start gap-6 p-4">
            {carouselCards.map((card, index) => (
                <div key={card.id} className="relative">
                    <RichCard
                        data={{
                            title: card.data.title || '',
                            description: card.data.description || '',
                            actions: card.data.actions || [],
                            onDelete: () => {
                                const updatedNodes = carouselCards.filter(n => n.id !== card.id);
                                if (data.onNodesChange) {
                                    data.onNodesChange(updatedNodes, id);
                                }
                            },
                            onChange: (field: 'title' | 'description', value: string) => {
                                const updatedNodes = carouselCards.map(n =>
                                    n.id === card.id
                                        ? { ...n, data: { ...n.data, [field]: value } }
                                        : n
                                );
                                if (data.onNodesChange) {
                                    data.onNodesChange(updatedNodes, id);
                                }
                            },
                            onActionsChange: (actions: any[]) => {
                                const updatedNodes = carouselCards.map(n =>
                                    n.id === card.id
                                        ? { ...n, data: { ...n.data, actions } }
                                        : n
                                );
                                if (data.onNodesChange) {
                                    data.onNodesChange(updatedNodes, id);
                                }
                            }
                        }}
                        currentCard={index + 1}
                        totalCards={totalCards}
                    />
                    <AddCardButton onClick={() => addCard(card.id)} />
                </div>
            ))}
        </div>
    );
} 