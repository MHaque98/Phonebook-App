const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Walker",
    number: "78-56-5323373",
    id: 3,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Home</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has ${persons.length} entries</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => id === person.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const payload = request.body;

  if (!payload.name || !payload.number) {
    return response.status(400).json({ error: "missing name or number." });
  }

  const newPerson = {
    name: payload.name,
    number: payload.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);
  response.status(200).json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const PORT = process.env.PORT || 3688;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
