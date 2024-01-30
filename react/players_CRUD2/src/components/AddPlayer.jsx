/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
