import React from 'react';

const History = () => {
    const history = JSON.parse(localStorage.getItem('history')) || [];

    return (
        <div className="history">
            <h3>History</h3>
            {history.map((item, index) => (
                <div key={index}>
                    <h4>Request {index + 1}</h4>
                    <p><strong>Original Content:</strong> {item.originalContent}</p>
                    <p><strong>Summary:</strong> {item.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default History;
