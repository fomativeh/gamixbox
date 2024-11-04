// Function to copy text to clipboard
export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        //   console.log('Text copied to clipboard');
    } catch (err) {
        //   console.error('Failed to copy text to clipboard', err);
    }
}