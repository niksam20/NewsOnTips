const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://sahilnarwalkumar01:NKAt7FJDy3gxccWc@cluster0.f42f14w.mongodb.net/');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){ 
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.post('/updateClickedNews', async (req, res) => {
    try {
        const { email, clickedNewsTitle } = req.body;

        // Find the user's document based on their email address
        const user = await FormDataModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the clicked news array in the user's document
        user.clickedNews.push(clickedNewsTitle);

        // Save the updated document back to the database
        await user.save();

        res.json({ message: 'Clicked news updated successfully' });
    } catch (error) {
        console.error('Error updating clicked news:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});