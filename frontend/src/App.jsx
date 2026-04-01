import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  

  const analyzeText = async () => {
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data);
  };

  const uploadFile = async () => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  setResult(data);
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Academic Assistant</h1>

      <textarea
        rows="6"
        cols="50"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={analyzeText}>Analyze</button>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
<br /><br />
<button onClick={uploadFile}>Upload File</button>

      <h2>Results:</h2>

      {result && (
        <div>
          <p><b>Assignments:</b> {result.assignments.join(", ")}</p>
          <p><b>Events:</b> {result.events.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;