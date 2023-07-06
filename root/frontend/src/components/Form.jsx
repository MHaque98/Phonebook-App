/* eslint-disable react/prop-types */
//import { useState } from "react";

const Form = ({ name, number, setName, setNumber, handleSubmit }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <input
          className="input"
          placeholder="Full Name"
          type="text"
          id="nameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          className="input"
          placeholder="Phone number"
          type="number"
          id="numberInput"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <button className="button" type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default Form;
