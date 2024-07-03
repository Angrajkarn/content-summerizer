import React, { useState } from 'react';
import { scrapeContent } from '../utils/scraper';

const InputForm = ({ setOriginalContent, setScrapedContent }) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleScrape = async () => {
        try {
            const content = await scrapeContent(url);
            setScrapedContent(content);
            setOriginalContent(content);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        setOriginalContent(e.target.value);
    };

    return (
        <div className="input-form">
            {error && <p className="error">{error}</p>}
            <textarea
                placeholder="Enter or paste text here..."
                value={text}
                onChange={handleTextChange}
            ></textarea>
            <input
                type="text"
                placeholder="Enter URL to scrape content"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleScrape}>Scrape Content</button>
        </div>
    );
};

export default InputForm;
