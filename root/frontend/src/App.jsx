/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import personService from "./services/persons";
import axios from "axios";
import "./Style.css";

import Header from "./components/Header";
import Form from "./components/Form";
import Entry from "./components/Entry";
import Filter from "./components/Filter";

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic or API request here
    console.log(`Name: ${name}, Number: ${number}`);
    const personAlreadyExists = persons.find((person) => person.name === name);
    if (!personAlreadyExists) {
      const newPerson = {
        name: name,
        number: number,
        id: persons.length + 1,
      };
      personService.createEntry(newPerson).then((returnedNewPerson) => {
        console.log(`returnedNewPerson: `, returnedNewPerson);
        setPersons((prevPersons) => [...prevPersons, returnedNewPerson]);
      });

      // Reset form inputs
      setName("");
      setNumber("");
    } else {
      alert(`${name} already exists in phonebook!`);
    }
  };

  const handleDelete = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    console.log(updatedPersons);

    personService.deleteEntry(id).then(setPersons(updatedPersons));
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const personEntry = filteredPersons.map((person) => {
    return (
      <Entry
        key={person.id}
        fullName={person.name}
        number={person.number}
        handleDelete={() => handleDelete(person.id)}
      />
    );
  });
  return (
    <div className="App">
      <Header />
      <div className="form-entry-container">
        <div>
          <Form
            name={name}
            number={number}
            setName={setName}
            setNumber={setNumber}
            handleSubmit={handleSubmit}
          />
          <Filter filter={filter} setFilter={setFilter} />
          {/* <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          /> */}
        </div>
        <div className="entries">{personEntry}</div>
      </div>
    </div>
  );
}

export default App;
