const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/index.html')));

app.use('/static', express.static(path.resolve(__dirname, "../src")));

app.listen(port, console.log(`Server listening on Port ${port}`))
