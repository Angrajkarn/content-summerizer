import React, { useState } from 'react';
import { cleanContent } from '../utils/cleanContent';
import { scrapeContent, detectMainContent } from '../utils/scraper';

const ScrapePreview = ({ scrapedContent, setScrapedContent, handleSummarize }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(scrapedContent);
    const [scrapingScope, setScrapingScope] = useState('entire'); // Default scraping scope

    const handleScrape = async () => {
        try {
            const content = await scrapeContent(scrapingScope);
            setScrapedContent(content);
            setEditedContent(content);
        } catch (error) {
            console.error('Error scraping content:', error.message);
            // Handle error state or display error message to the user
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setScrapedContent(editedContent);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedContent(e.target.value);
    };

    const handleScopeChange = (e) => {
        setScrapingScope(e.target.value);
    };

    return (
        <div className="scrape-preview">
            <textarea
                value={scrapedContent}
                onChange={(e) => setEditedContent(e.target.value)}
            />
            <div>
                <label>Select Scraping Scope:</label>
                <select value={scrapingScope} onChange={handleScopeChange}>
                    <option value="entire">Entire Page</option>
                    <option value="article">Main Article Body</option>
                    {/* Add more options as needed */}
                </select>
                <button onClick={handleScrape}>Scrape Content</button>
                <button onClick={handleSummarize}>Summarize</button>
            </div>
            <h3>Scraped Content Preview</h3>
            {isEditing ? (
                <textarea
                    value={editedContent}
                    onChange={handleChange}
                />
            ) : (
                <p>{scrapedContent}</p>
            )}
            {isEditing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
};

export default ScrapePreview;
