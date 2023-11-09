import React, { useState } from "react";

const dataLowercase = "azertyuiopqsdfghjklmwxcvbn";
const dataUppercase = dataLowercase.toUpperCase();
const dataNumbers = "0123456789";
const dataSymbols = "$^*ùm!:;,&é\"'(-è_ç)";

function App() {
  const [password, setPassword] = useState("Générateur de MDP");
  const [passwordLength, setPasswordLength] = useState(8);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let data = [];
    let newPassword = "";

    if (lowercase) data.push(...dataLowercase);
    if (uppercase) data.push(...dataUppercase);
    if (numbers) data.push(...dataNumbers);
    if (symbols) data.push(...dataSymbols);

    if (data.length === 0) {
      alert("Veuillez sélectionner des critères");
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      newPassword += data[Math.floor(Math.random() * data.length)];
    }

    setPassword(newPassword);

    navigator.clipboard.writeText(newPassword).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="app">
      <input type="text" id="password-output" value={password} readOnly />

      <div className="range-container">
        <input
          type="range"
          id="password-length"
          min="4"
          max="24"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
        <input
          type="text"
          id="display-password-length"
          value={passwordLength}
          readOnly
        />
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="lowercase"
          checked={lowercase}
          onChange={() => setLowercase(!lowercase)}
        />
        <label htmlFor="lowercase">a-z</label>

        <input
          type="checkbox"
          id="uppercase"
          checked={uppercase}
          onChange={() => setUppercase(!uppercase)}
        />
        <label htmlFor="uppercase">A-Z</label>

        <input
          type="checkbox"
          id="numbers"
          checked={numbers}
          onChange={() => setNumbers(!numbers)}
        />
        <label htmlFor="numbers">0-9</label>

        <input
          type="checkbox"
          id="symbols"
          checked={symbols}
          onChange={() => setSymbols(!symbols)}
        />
        <label htmlFor="symbols">!-?</label>
      </div>

      <button onClick={generatePassword} id="generateButton">
        {copied ? "Copié !" : "Générer mot de passe"}
      </button>
    </div>
  );
}

export default App;
