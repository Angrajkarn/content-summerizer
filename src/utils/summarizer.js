export const summarizeText = (text, length = 'medium') => {
    const summaries = {
        short: text.slice(0, 50) + '...',
        medium: text.slice(0, 200) + '...',
        long: text.slice(0, 500) + '...'
    };
    return summaries[length];
};
