const express = require('express');

const cors = require('cors');
const loginRouter = require('./router/loginRouter');
const getInfoRouter = require('./router/getInfoRouter');
const complaintsRouter = require('./router/complaintsRouter');
const connectDB = require('./config/db')



connectDB();
const app = express();


app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 8800, () => {
    console.log('Server listening on port %d ', server.address().port);
});

app.get('/', (req, res) => {
    res.send('Complaint System API is running');
});

app.use('/login', loginRouter);

app.use('/getInfo', getInfoRouter);

app.use('/complaints', complaintsRouter);
