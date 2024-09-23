import React, { useState, useEffect } from "react";
import JsonInputForm from "./components/JsonInputForm";

const App = () => {
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    document.title = "RA2111033010155";
  }, []);

  const filterResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (dropdownOptions.includes("alphabets")) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (dropdownOptions.includes("numbers")) {
      filteredResponse.numbers = response.numbers;
    }
    if (dropdownOptions.includes("highest-lowercase")) {
      filteredResponse["highest-lowercase"] = response["highest-lowercase"];
    }
    return filteredResponse;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Bajaj Task by RA2111033010155
      </h1>

      <div className="w-full max-w-3xl">
        <JsonInputForm
          setResponse={setResponse}
          setDropdownOptions={setDropdownOptions}
        />
      </div>

      {response && (
        <pre className="mt-8 bg-gray-100 p-4 rounded-lg shadow-lg text-left text-sm text-gray-800 w-full max-w-3xl">
          {JSON.stringify(filterResponse(), null, 2)}
        </pre>
      )}
    </div>
  );
};

export default App;
