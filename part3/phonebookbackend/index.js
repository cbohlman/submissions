require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
  let content;
  Person.count({}).then((count) => {
    content = `
        <p>Phonebook has info for ${count} people</p>
        <br/>
        <p>${new Date().toString()}</p>
        `;
    response.send(content);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined) {
    return response.status(400).json({ error: "missing name" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "missing number" });
  }
  // if (
  //   persons.filter(
  //     (person) => person.name.toLowerCase() === body.name.toLowerCase()
  //   ).length > 0
  // ) {
  //   return response.status(400).json({ error: "Entry already exists" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.send(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
