import React, { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      setPassword("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
    setCopied(false);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = useCallback(() => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="bg-white bg-opacity-20 p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">
          Password Generator
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center text-white text-sm sm:text-base">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="mr-2"
              />
              Uppercase
            </label>
            <label className="flex items-center text-white text-sm sm:text-base">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="mr-2"
              />
              Lowercase
            </label>
            <label className="flex items-center text-white text-sm sm:text-base">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="mr-2"
              />
              Numbers
            </label>
            <label className="flex items-center text-white text-sm sm:text-base">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="mr-2"
              />
              Symbols
            </label>
          </div>
          <button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:from-pink-600 hover:to-yellow-600 transition duration-300 text-sm sm:text-base"
          >
            Generate Password
          </button>
          <div className="mt-4 relative">
            <label className="block text-white mb-2 text-sm sm:text-base">
              Generated Password:
            </label>
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full bg-white bg-opacity-20 text-white p-2 rounded-l-md text-sm sm:text-base"
              />
              <button
                onClick={copyToClipboard}
                className="bg-white bg-opacity-20 text-white p-2 rounded-r-md hover:bg-opacity-30 transition duration-300 flex items-center justify-center"
                title="Copy to clipboard"
                disabled={!password}
              >
                {copied ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
