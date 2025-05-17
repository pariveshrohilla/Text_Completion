const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON in POST requests
app.use(express.json());

// Trie logic
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }

  collectWords(node, prefix, results) {
    if (node.isEndOfWord) results.push(prefix);
    for (let char in node.children) {
      this.collectWords(node.children[char], prefix + char, results);
    }
  }

  getSuggestions(prefix) {
    const node = this.searchPrefix(prefix);
    if (!node) return [];
    const results = [];
    this.collectWords(node, prefix, results);
    return results;
  }
}

// Initialize and populate Trie
const trie = new Trie();
const wordsPath = path.join(__dirname, 'words.txt');
const words = fs.readFileSync(wordsPath, 'utf-8').split(/\s+/);
for (let word of words) trie.insert(word.toLowerCase());
console.log(`Trie built with ${words.length} words.`);

// Serve static files (HTML, CSS, JS) from public directory
app.use(express.static('public'));

// GET /suggest API for autocomplete
app.get('/suggest', (req, res) => {
  const prefix = req.query.prefix?.toLowerCase() || '';
  const suggestions = trie.getSuggestions(prefix).slice(0, 10);
  res.json(suggestions);
});

// POST /add-word API to add a new word
app.post('/add-word', (req, res) => {
  const newWord = req.body.word?.trim().toLowerCase();
  if (!newWord || !/^[a-z]+$/.test(newWord)) {
    return res.json({ message: "Invalid word." });
  }

  if (trie.getSuggestions(newWord).includes(newWord)) {
    return res.json({ message: "Word already exists." });
  }

  fs.appendFileSync(wordsPath, `\n${newWord}`);
  trie.insert(newWord);
  res.json({ message: `'${newWord}' added successfully.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
