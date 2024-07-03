import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from './InputForm';
import ScrapePreview from './ScrapePreview';
import SummaryResult from './SummaryResult';
import History from './History';
import { scrapeContent } from '../utils/scraper';
import { isAuthenticated, logout, getUsername } from '../utils/auth';
import { exportAsPlainText, exportAsPDF } from '../utils/export';
import LoadingSpinner from './LoadingSpinner';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
    const [originalContent, setOriginalContent] = useState('');
    const [scrapedContent, setScrapedContent] = useState('');
    const [summary, setSummary] = useState('');
    const [length, setLength] = useState('medium');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false); // State for showing/hiding history
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const summarizedText = await generateSummary(originalContent, length);
            setSummary(summarizedText);
            saveToHistory(originalContent, summarizedText);
        } catch (error) {
            setError('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleScrape = async () => {
        setLoading(true);
        try {
            const content = await scrapeContent(scrapedContent);
            setScrapedContent(content);
            setOriginalContent(content);
            setError('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExportText = () => {
        exportAsPlainText(summary);
    };

    const handleExportPDF = () => {
        exportAsPDF(summary);
    };

    const saveToHistory = (originalContent, summary) => {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push({ originalContent, summary });
        localStorage.setItem('history', JSON.stringify(history));
    };

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome, {getUsername()}</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            {error && <p className="error-message">{error}</p>}
            <InputForm setOriginalContent={setOriginalContent} setScrapedContent={setScrapedContent} />
            {loading && <LoadingSpinner />}
            {scrapedContent && !loading && (
                <ScrapePreview
                    scrapedContent={scrapedContent}
                    setScrapedContent={setScrapedContent}
                    handleSummarize={handleSummarize}
                    handleScrape={handleScrape}
                />
            )}
            <div className="summary-options">
                <label>Summary Length:</label>
                <select value={length} onChange={(e) => setLength(e.target.value)}>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>
                <button onClick={handleSummarize}>Generate Summary</button>
            </div>
            <SummaryResult originalContent={originalContent} summary={summary} />
            <div className="export-buttons">
                <button onClick={handleExportText}>Export as Text</button>
                <button onClick={handleExportPDF}>Export as PDF</button>
                <button className="history-toggle-button" onClick={toggleHistory}>
                    {showHistory ? 'Hide History' : 'Show History'}
                </button>
            </div>
            {showHistory && <History />} {/* Conditional rendering of history based on showHistory state */}
        </div>
    );
};

export default Dashboard;

// Mock function to generate summary based on length
const generateSummary = (text, length) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (length) {
                case 'short':
                    resolve(text.slice(0, 100) + '...');
                    break;
                case 'medium':
                    resolve(text.slice(0, 200) + '...');
                    break;
                case 'long':
                    resolve(text.slice(0, 300) + '...');
                    break;
                default:
                    resolve(text.slice(0, 200) + '...');
            }
        }, 2000); // Simulating delay for loading
    });
};
