import config from './config.js';

async function generateBouquet(flowers) {
    const prompt = `A single portrait in elegant Japanese manga style of a distinguished young man with 
        silver-gray spiky hair styled upward in a dynamic way. He has sharp, intense eyes with a 
        captivating gaze, refined facial features with a strong jawline, and fair skin. His expression 
        shows quiet confidence and refined elegance. He's wearing a perfectly tailored black high-neck 
        designer outfit that suggests sophistication. The man is gracefully presenting a stunning flower 
        bouquet containing ${flowers.join(', ')}. The flowers should be rendered in vibrant, rich colors 
        with high saturation, creating an artistic contrast against his sleek attire. The art style should 
        be high-end Japanese illustration, reminiscent of luxury fashion manga and premium visual novels, 
        with clean, bold lines and dramatic shading typical of contemporary manga. The character should 
        command attention at the center of the frame, emanating an aura of refined sophistication. The 
        background should feature elegant gradient tones with subtle sparkles and flowing lines, common 
        in high-end manga art. Emphasis on a single, impactful composition that captures both strength 
        and grace. The overall aesthetic should be luxurious and polished, like a high-end fashion 
        illustration meets premium manga art.`;

    try {
        if (!config.OPENAI_API_KEY) {
            throw new Error('API key not found. Please set your OpenAI API key first.');
        }

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
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