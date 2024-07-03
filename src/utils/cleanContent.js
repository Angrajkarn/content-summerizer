export const cleanContent = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    // Remove scripts
    const scripts = doc.querySelectorAll('script');
    scripts.forEach((script) => script.remove());

    // Remove styles
    const styles = doc.querySelectorAll('style');
    styles.forEach((style) => style.remove());

    // Return cleaned HTML
    return doc.body.innerHTML;
};
