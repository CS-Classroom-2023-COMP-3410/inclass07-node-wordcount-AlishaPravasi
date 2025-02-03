const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // Directly require chalk (Jest will mock it)

/**
 * Reads the content of 'declaration.txt' synchronously.
 */
function readFileContent() {
    const filePath = path.join(__dirname, 'declaration.txt');
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Gets word counts.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.toLowerCase().split(/\W+/).filter(Boolean);

    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return wordCount;
}

/**
 * Colors a word based on frequency.
 */
function colorWord(word, count) {
    if (count === 1) return chalk.blue(word);
    if (count > 1 && count <= 5) return chalk.green(word);
    return chalk.red(word);
}

/**
 * Prints first 15 lines with colored words.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word =>
            word ? colorWord(word, wordCount[word.toLowerCase()] || 0) : ''
        ).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to process the file.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

// Run when executed directly
if (require.main === module) {
    processFile();
}

// Export for testing
module.exports = { readFileContent, getWordCounts, colorWord, printColoredLines };
