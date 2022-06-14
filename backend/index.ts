import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {API_URL, CONNECTION_STR} from './enviroment';
import {categoriesRouter} from "./src/routes/categories";
import {productsRouter} from "./src/routes/products";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(`${API_URL}/categories`, categoriesRouter);
app.use(`${API_URL}/products`, productsRouter);

mongoose.connect(CONNECTION_STR)
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('Connection opened')
    }).catch((e) => {
    // tslint:disable-next-line:no-console
    console.log('error', e)
});


app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log('server running on http://localhost:3000');
});

