// const express = require('express')

// const app = express();



// app.get('/', async (req, res) => {

//     try {
//         res.status(200).send({
//             status: true,
//             message: 'Welcome to the Grocery API!',
//             data: [
//                 {
//                     name: "John",
//                     age: 30,
//                     city: "New York"
//                 },
//                 {
//                     name: "Jane",
//                     age: 28,
//                     city: "Los Angeles"
//                 },
//                 {
//                     name: "Mike",
//                     age: 32,
//                     city: "Chicago"
//                 },
//                 {
//                     name: "Sarah",
//                     age: 25,
//                     city: "San Francisco"
//                 }
//             ]
//         })
//     } catch (error) {
//         res.status(500).send({
//             status: false,
//             message: error.message
//         })
//     }
// })