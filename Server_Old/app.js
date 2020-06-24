import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

const app = express();

dotenv.config({ silent: true });
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(routes);
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true }).then(() => {
	app.listen(3001, () => console.log('Express Application listening on port 3001.'));
}).catch((err) => console.log(err));
