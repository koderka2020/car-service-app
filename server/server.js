const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/index.html')));

app.use('/static', express.static(path.resolve(__dirname, "../src")));

app.listen(port, console.log(`Server listening on Port ${port}`))
