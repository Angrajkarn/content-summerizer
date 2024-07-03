import { jsPDF } from 'jspdf';

export const exportAsPlainText = (summaryText) => {
    const element = document.createElement('a');
    const file = new Blob([summaryText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'summary.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
};
export const exportAsPDF = (summaryText) => {
    const doc = new jsPDF();
    doc.text(summaryText, 10, 10);
    doc.save('summary.pdf');
};