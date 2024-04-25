const express = require('express');
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/booksRoute');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
