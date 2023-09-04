const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/userModel');

const app = express();
app.use(cors());
app.use(express.json());
// ========================================================


// // Connect to MongoDB using Mongoose for mongodb Atlas
// const uri = " "; //Enter here mongodb uri
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected successfully to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
//   });

// =========================================================

// And this is connect mongodb compass
// database connection and Database Name mernCrud
mongoose.connect('mongodb://127.0.0.1:27017/mernCrud')
// here is get data all user
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


// getuser data for update
// Retrieves a single user by ID from the database.
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, phone, age, active } = req.body;

    // Basic validation: Check if required fields are present.
    if (!name || !email || !phone || !age) {
        return res.status(400).json({ error: 'Name, email, phone, and age are required fields.' });
    }

    UserModel.findByIdAndUpdate({ _id: id },
        { name, email, phone, age, active })
        .then(users => {
            res.json(users)
            console.log(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to update user.' });
        });
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    // Basic validation: Check if the ID is a valid MongoDB ObjectID.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    UserModel.findByIdAndDelete({ _id: id })
        .then(user => {
            // If no user found with the given ID, return an error.
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            res.json({ message: 'User deleted successfully.' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to delete user.' });
        });
})

app.post("/createUser", (req, res) => {
    const { name, email, phone, age, active } = req.body;

    // Basic validation: Check if required fields are present.
    if (!name || !email || !phone || !age) {
        return res.status(400).json({ error: 'Name, email, phone, and age are required fields.' });
    }

    UserModel.create({ name, email, phone, age, active })
        .then(users => {
            res.json(users)
            console.log(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create user.' });
        });
})

//database connected
app.listen(8080, () => {
    console.log('server started at 80880');
});


