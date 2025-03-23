import { UNSPLASH_ACCESS_KEY } from "@/config/api";

export const fetchRandomPizzaImage = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random?query=pizza&orientation=landscape', {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        console.error('Error fetching pizza image:', error);
        throw error;
    }
}; 