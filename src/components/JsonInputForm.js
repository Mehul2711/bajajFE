import React, { useState } from "react";

const JsonInputForm = ({ setResponse, setDropdownOptions }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [isValidJson, setIsValidJson] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const trimmedJsonInput = jsonInput.trim();
      const parsedJson = JSON.parse(trimmedJsonInput);

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
    } catch (e) {
      setError("Invalid JSON input!");
      setIsValidJson(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON here"
          className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {isValidJson && (
        <div className="mt-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Select Filters:
          </label>
          <div className="relative inline-block w-full">
            <select
              multiple={true}
              className="block w-full py-2 pl-3 pr-10 text-base border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
              onChange={(e) =>
                setDropdownOptions(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
            >
              <option value="alphabets" className="text-blue-600 font-medium">
                Alphabets
              </option>
              <option value="numbers" className="text-green-600 font-medium">
                Numbers
              </option>
              <option
                value="highest-lowercase"
                className="text-red-600 font-medium"
              >
                Highest Lowercase Alphabet
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonInputForm;
