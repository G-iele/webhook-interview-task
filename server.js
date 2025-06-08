import express from 'express';
import events from './routes/events.js';
import products from './routes/products.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/events', events);
app.use('/api/products', products);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
