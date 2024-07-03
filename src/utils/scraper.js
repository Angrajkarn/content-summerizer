import axios from 'axios';
import { convert } from 'html-to-text';
// port { cleanContent } from './cleanContent'; 

export const scrapeContent = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Failed to fetch HTML content. Please check the URL and try again.');
        }
         const html = response.data;
         const text = extractMainContent(html);
         return text;
    } catch (error) {
        console.error('Error scraping content:', error.message);
        throw new Error('Failed to scrape content from the provided URL.');
    }
};

export const extractMainContent = (html) => {
    const text = convert(html, {
        wordwrap: 130,
        selectors: [
            { selector: 'p', format: 'inline' },
            { selector: 'article', format: 'block' },
            { selector: 'div', format: 'block' }
        ]
    });
    return text;
};
