import { Handle, Position } from 'reactflow';
import { Button } from "@/components/ui/shadcn/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { useState, useEffect } from "react";
import { fetchRandomPizzaImage } from "@/api/image";
import { RichCardProps } from "@/types/card";
import { CardIcon } from "@/assets/icons/CardIcon";
import { UploadIcon } from "@/assets/icons/UploadIcon";
import { ActionIcon } from "@/assets/icons/ActionIcon";
import { DotsIcon } from "@/assets/icons/DotsIcon";

export function RichCard({ data, currentCard, totalCards }: RichCardProps) {
    const [pizzaImage, setPizzaImage] = useState<string>('');

    useEffect(() => {
        let mounted = true;

        const loadPizzaImage = async () => {
            try {
                const imageUrl = await fetchRandomPizzaImage();
                if (mounted) {
                    setPizzaImage(imageUrl);
                }
            } catch (error) {
                console.error('Error loading pizza image:', error);
            }
        };

        loadPizzaImage();

        return () => {
            mounted = false;
        };
    }, []);

    const addAction = () => {
        const newAction = {
            id: Math.random().toString(36).substr(2, 9),
            type: null
        };
        const updatedActions = [...(data.actions || []), newAction];
        if (data.onActionsChange) {
            data.onActionsChange(updatedActions);
        }
    };

    const updateActionType = (id: string, type: string) => {
        const updatedActions = (data.actions || []).map(action =>
            action.id === id ? { ...action, type } : action
        );
        if (data.onActionsChange) {
            data.onActionsChange(updatedActions);
        }
    };

    const deleteAction = (id: string) => {
        const updatedActions = (data.actions || []).filter(action => action.id !== id);
        if (data.onActionsChange) {
            data.onActionsChange(updatedActions);
        }
    };

    return (
        <Card className="w-[350px] bg-white pb-0">
            <Handle
                id={`target-top-${currentCard ? `-${currentCard}` : ''}`}
                type="target"
                position={Position.Top}
                style={{
                    background: 'white',
                    border: '2px solid #555',
                    width: '12px',
                    height: '12px'
                }}
            />
            <Handle
                id={`source-left-${currentCard ? `-${currentCard}` : ''}`}
                type="source"
                position={Position.Left}
                style={{
                    top: '50%',
                    background: '#555',
                    width: '10px',
                    height: '10px'
                }}
            />

            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 items-center">
                        <CardIcon />
                    </span>
                    <span className="text-sm font-medium">Bot says</span>

                </div>
                <div className="flex items-center gap-2">
                    {currentCard && totalCards && (
                        <span className="text-sm font-medium text-gray-500">{currentCard}/{totalCards}</span>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex items-center justify-center">
                                <DotsIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={`bg-white ${data.onDelete ? 'visible' : 'hidden'}`}>
                            <DropdownMenuItem onClick={() => {
                                if (data.onDelete) {
                                    data.onDelete();
                                }
                            }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="h-[200px] bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    {pizzaImage ? (
                        <img
                            src={pizzaImage}
                            alt="Pizza"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UploadIcon />
                    )}
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Title your card here..."
                            value={data.title}
                            onChange={(e) => {
                                if (data.onChange) {
                                    data.onChange('title', e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            placeholder="Describe your card here..."
                            value={data.description}
                            onChange={(e) => {
                                if (data.onChange) {
                                    data.onChange('description', e.target.value);
                                }
                            }}
                            className="min-h-[100px] resize-none"
                        />
                    </div>
                </div>
            </CardContent>
            {(data.actions || []).map((action) => (
                <div key={action.id} className="px-6 py-4 border-t relative">
                    <Handle
                        id={`source-action-${action.id}${currentCard ? `-${currentCard}` : ''}`}
                        type="source"
                        position={Position.Right}
                        style={{ top: '70%', background: '#555', width: '10px', height: '10px' }}
                    />
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <ActionIcon />
                            <span className="text-sm font-medium">Action</span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 flex items-center justify-center">
                                    <DotsIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                                <DropdownMenuItem onClick={() => deleteAction(action.id)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Select onValueChange={(value) => updateActionType(action.id, value)} value={action.type || ''}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Choose toppings..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="Extra Cheese">Extra Cheese</SelectItem>
                            <SelectItem value="Mushrooms">Mushrooms</SelectItem>
                            <SelectItem value="Pepper">Pepper</SelectItem>
                            <SelectItem value="Onions">Onions</SelectItem>
                            <SelectItem value="Black Olives">Black Olives</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            ))}
            <CardFooter className="border-t p-0 bg-gray-100">
                <Button
                    className="w-full text-muted-foreground hover:text-muted-foreground font-normal text-gray-500 rounded-none rounded-b-lg"
                    variant="ghost"
                    onClick={addAction}
                >
                    + Add action
                </Button>
            </CardFooter>
        </Card>
    );
} 