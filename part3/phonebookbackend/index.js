const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const MAX_ID = 1000000000000000;

app.use(cors());
app.use(express.json());

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * MAX_ID);
};

app.get("/", (request, response) => {
  const content = `
        <p>Phonebook has info for ${persons.length} people</p>
        <br/>
        <p>${new Date().toString()}</p>
        `;
  response.send(content);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "missing name" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  }
  if (
    persons.filter(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    ).length > 0
  ) {
    return response.status(400).json({ error: "Entry already exists" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
