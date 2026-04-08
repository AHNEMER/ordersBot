require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
