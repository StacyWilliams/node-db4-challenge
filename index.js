const server = require('./server.js');
const express = require('express')
const PORT = process.env.PORT || 4000;

server.use(express.json())

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.get("/" , (req, res) => {
    res.send("<h1>Stacy's Project</h1>")
})