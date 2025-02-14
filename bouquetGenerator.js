async function generateBouquet(flowers) {
    const prompt = `Create a digital illustration of an elegant figure presenting a beautiful flower bouquet. 
        The bouquet contains ${flowers.join(', ')}. The figure has silver-gray hair and wears formal attire. 
        The art style should be clean and sophisticated, with attention to detail in both the character and 
        the flower arrangement. The background should feature soft lighting and gentle gradients. 
        The overall composition should be centered and balanced, emphasizing the beauty of the flowers 
        and the elegance of the presentation. The flowers should be rendered in vibrant, rich colors 
        with high saturation, creating a striking visual impact.`;

    try {
        const apiKey = localStorage.getItem('openai_api_key');
        if (!apiKey) {
            throw new Error('API key not found. Please set your OpenAI API key first.');
        }

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                quality: "standard"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(errorData.error?.message || 'Failed to generate image');
        }

        const data = await response.json();
        return data.data[0].url;
    } catch (error) {
        console.error('Error generating bouquet:', error);
        throw error;
    }
}

export { generateBouquet };