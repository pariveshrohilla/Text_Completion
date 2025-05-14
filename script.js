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
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
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

let trie = new Trie();

async function loadWordsFromFile() {
  try {
    const response = await fetch('words.txt'); // Ensure the file is in the correct location
    if (!response.ok) throw new Error("Failed to load words.txt");

    const text = await response.text();
    const words = text.trim().split(/\s+/);
    trie = new Trie();
    for (let word of words) {
      trie.insert(word.toLowerCase());
    }

    document.getElementById("suggestions").innerHTML =
      "Trie built with " + words.length + " words from file.";
  } catch (error) {
    console.error("Error loading words file:", error);
    document.getElementById("suggestions").innerHTML =
      "Error loading dictionary file.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sentenceInput = document.getElementById("sentenceInput");
  const output = document.getElementById("suggestions");

  sentenceInput.addEventListener("input", () => {
    const fullText = sentenceInput.value;
    const words = fullText.trim().split(/\s+/);
    const lastWord = words[words.length - 1].toLowerCase();

    if (!lastWord) {
      output.innerHTML = "";
      return;
    }

    const suggestions = trie.getSuggestions(lastWord);
    if (suggestions.length === 0) {
      output.innerHTML = "<div>No suggestions found.</div>";
    } else {
      output.innerHTML = suggestions
        .map(s => `<div class="suggestion" onclick="completeWord('${s}')">${s}</div>`)
        .join("");
    }
  });
});

function completeWord(word) {
  const input = document.getElementById("sentenceInput");
  const parts = input.value.trim().split(/\s+/);
  parts[parts.length - 1] = word;
  input.value = parts.join(" ") + " ";
  
  // Refocus input
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);

  document.getElementById("suggestions").innerHTML = "";
}
