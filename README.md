# Smart Autocomplete System

A web-based autocomplete system using Trie data structure, built with Node.js and JavaScript.

## Features

- Suggests words based on prefix input
- Highlights matching prefix
- Allows adding new words to dictionary
- Updates stored words.txt file

## Setup

```bash
npm install
node server.js
```

This is how the filee directory should look like
<br>

smart-autocomplete/<br>
├── server.js<br>
├── words.txt<br>
└── public/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ├── index.html<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ├── script.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   └── style.css<br>


<hr>
📈 Time Complexity<br>
Operation	Complexity<br>
Insertion	O(n)<br>
Prefix Search	O(n)<br>
Suggestion Generation	O(k) where k is total matched suggestions<br>


<br><br>
Trie built with [N] words.
Server running at http://localhost:3000
open this in browser and see the final results
