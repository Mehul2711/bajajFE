import React, { useState } from "react";

const JsonInputForm = ({ setResponse, setDropdownOptions }) => {
  // Declare all necessary state variables
  const [jsonInput, setJsonInput] = useState(""); 
  const [error, setError] = useState(""); 
  const [isValidJson, setIsValidJson] = useState(false); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const trimmedJsonInput = jsonInput.trim(); 
      console.log("Trimmed JSON input:", trimmedJsonInput);

      
      const parsedJson = JSON.parse(trimmedJsonInput); 
      console.log("Parsed JSON:", parsedJson);

      setIsValidJson(true);

     
      const res = await fetch("https://bajajbe-7pcf.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await res.json();
      setResponse(data);
      console.log("Response from backend:", data);
    } catch (e) {
      console.error("Error while parsing JSON:", e);
      setError("Invalid JSON input!");
      setIsValidJson(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            console.log("Text area value:", e.target.value); 
          }}
          placeholder="Enter JSON here"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isValidJson && (
        <div>
          <label>Select Filters:</label>
          <select
            multiple={true}
            onChange={(e) =>
              setDropdownOptions(
                [...e.target.selectedOptions].map((o) => o.value)
              )
            }
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest-lowercase">
              Highest Lowercase Alphabet
            </option>
          </select>
        </div>
      )}
    </div>
  );
};

export default JsonInputForm;
