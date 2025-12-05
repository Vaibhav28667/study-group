const cors = require('cors'); //cross origin resource sharing middleware

const express = require('express'); // Import the Express library

const userRouter = require('./routers/userRouter');
const groupRouter = require('./routers/groupRouter');


const app = express(); // Create an express application

const PORT = 5000; // Define the part number

// Middleware -
app.use(cors({
    origin: '*', //allow request from any origin
}))
app.use(express.json()); //Parse json request bodies
app.use('/user', userRouter)
app.use('/group',groupRouter)


// // Routing
// app.get('/', (req, res) => {
//     res.send("Hello from backend");
// });

// app.get('/add', (req, res) => {
//     res.send("Hello from  Add Route");
// })    

// // /getall route
// app.get('/getall',(req, res) => {
//     res.send("Hello from Getall Route")
// })
// // /delete route
// app.get('/delete', (req, res) => {
//     res.send("Hello from Delete Route")
// })
// // /update route
// app.get('/update', (req, res) => {
//     res.send("Hello from Update Route")
// })


app.listen(PORT, () => {
    console.log("Server is running on port -", + PORT);
})

