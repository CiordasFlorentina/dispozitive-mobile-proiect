import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import {API_URL, CONNECTION_STR} from './enviroment';
import {categoriesRouter} from "./src/routes/categories";
import {productsRouter} from "./src/routes/products";
import {usersRouter} from "./src/routes/users";
import {ordersRouter} from "./src/routes/orders";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan('tiny'));


app.use(`${API_URL}/categories`, categoriesRouter);
app.use(`${API_URL}/products`, productsRouter);
app.use(`${API_URL}/users`, usersRouter);
app.use(`${API_URL}/orders`, ordersRouter);

mongoose.connect(CONNECTION_STR)
    .then(() => {
        console.log('Connection opened')
    }).catch((e) => {
    console.log('error', e)
});

app.listen("3000", () => {
    console.log('server running on http://localhost:3000');
});

