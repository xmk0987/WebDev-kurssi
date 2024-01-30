/* eslint-disable react/prop-types */
/** @format
 *
 * Student instructions:
 * Create a AddPlayer component similar to the AddPlayer component in the Vue exercise.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 *
 */

import { useState } from "react";

export const AddPlayer = ({handleSubmit}) => {
  const [name, setName ]= useState("");

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      handleSubmit(name);
      setName(""); 
    }
  };

  return <div>
    <form id="submit-player" onSubmit={handleSubmitForm}>
      <input id="input-player" placeholder="Enter name" type="text" onChange={handleNameChange} value={name}/>
      <button className="btn-add" type="submit">Add</button>
    </form>
  </div>;
};
