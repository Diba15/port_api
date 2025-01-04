const express = require('express');

const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
require("dotenv").config();

// Models
const work = require('../common/models/Work')
const project = require('../common/models/Project')
const student = require('../common/models/Student')
const certificate = require('../common/models/Certificate')

// Middleware
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
      .then(r => {
        console.log("Connected to " + r.connections[0].name);
      }).catch(e => {
      console.log(e);
    })
  } finally {

  }
}

run().catch(err => console.error(err));

// Models Schemas
const studentSchema = new mongoose.Schema(student);

const workSchema = new mongoose.Schema(work)

const projectSchema = new mongoose.Schema(project)

const certificateSchema = new mongoose.Schema(certificate)

// Mongoose Models
const Student = mongoose.model('Student', studentSchema);
const Work = mongoose.model('work', workSchema);
const Project = mongoose.model('project', projectSchema);
const Certificate = mongoose.model('certificate', certificateSchema);

// CORS
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

app.post('/works', (req, res) => {
  const work = req.body;
  Work.create(work, null)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.put('/works/:id', (req, res) => {
  const id = req.params.id;
  const work = req.body;
  Work.updateOne({_id: id}, work)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.delete('/works/:id', (req, res) => {
  const id = req.params.id;
  Work.deleteOne({_id: id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

//Project Routes
app.get('/projects', (req, res) => {
  Project.find(undefined, undefined, undefined)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.post('/projects', (req, res) => {
  const project = req.body;
  Project.create(project, null)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.put('/projects/:id', (req, res) => {
  const id = req.params.id;
  const project = req.body;
  Project.updateOne({_id: id}, project)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.delete('/projects/:id', (req, res) => {
  const id = req.params.id;
  Project.deleteOne({_id: id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

//Certificate Routes
app.get('/certificates', (req, res) => {
  Certificate.find(undefined, undefined, undefined)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.post('/certificates', (req, res) => {
  const certificate = req.body;
  Certificate.create(certificate, null)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.put('/certificates/:id', (req, res) => {
  const id = req.params.id;
  const certificate = req.body;
  Certificate.updateOne({_id: id}, certificate)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})

app.delete('/certificates/:id', (req, res) => {
  const id = req.params.id;
  Certificate.deleteOne({_id: id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
})