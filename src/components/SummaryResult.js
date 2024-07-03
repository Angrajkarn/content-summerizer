import React from 'react';

const SummaryResult = ({ originalContent, summary }) => {
    return (
        <div className="summary-result">
            <div>
                <h3>Original Content</h3>
                <p>{originalContent}</p>
            </div>
            <div>
                <h3>Summary</h3>
                <p>{summary}</p>
            </div>
        </div>
    );
};

export default SummaryResult;
