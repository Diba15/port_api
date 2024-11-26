const express = require('express');

const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
const work = require('../common/models/Work')
require("dotenv").config();

// Middleware
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
      .then(r => {
        console.log("Connected to " + r.connections[0].name);
      }).catch(e => {
      console.log(e);
    })
  } finally {

  }
}

run().catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
  roll_no: Number,
  name: String,
  year: Number,
  subjects: [String]
});

const workSchema = new mongoose.Schema(work)

const Student = mongoose.model('Student', studentSchema);
const Work = mongoose.model('work', workSchema);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Student Routes
app.get('/students', (req, res) => {
  Student.find(undefined, undefined, undefined)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.post('/students', (req, res) => {
  const student = req.body;
  Student.create(student, null)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = req.body;
  Student.updateOne({_id: id}, student)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  Student.deleteOne({_id: id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

//Work Routes
app.get('/works', (req, res) => {
  Work.find(undefined, undefined, undefined)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})