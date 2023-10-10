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

app.get("/", (request, response) => {
  const content = `
        <p>Phonebook has info for ${persons.length} people</p>
        <br/>
        <p>${new Date().toString()}</p>
        `;
  response.send(content);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
