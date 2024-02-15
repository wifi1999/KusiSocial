const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');

dotenv.config();

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', () => console.log('MongoDB connected'));

app.use(cors());

app.use('/images', express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.post('/api/upload', upload.single("file"), (req, res) => {
    try{
        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch(err){
        console.error(err);
    }
});

app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

app.listen(8080, () => console.log('Server is listening on port 8080'));

