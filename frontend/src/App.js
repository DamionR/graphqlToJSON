import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('graphql-to-json'); // Toggle mode

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const endpoint =
        mode === 'graphql-to-json'
          ? 'http://localhost:4000/graphql-to-json'
          : 'http://localhost:4000/json-to-graphql';

      const payload =
        mode === 'graphql-to-json'
          ? { query: input }
          : { json: JSON.parse(input) };

      const res = await axios.post(endpoint, payload);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError('Error: Could not process the input. Please check your input.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setInput(e.target.result);
      reader.readAsText(file);
    }
  };

  const handleCopyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  const handleDownload = () => {
    if (response) {
      const blob = new Blob([response], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `response.${mode === 'graphql-to-json' ? 'json' : 'graphql'}`;
      link.click();
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem', color: '#333' }}>
        GraphQL & JSON Converter
      </h1>
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          marginBottom: '20px',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
          Convert between GraphQL queries and JSON representations. Choose your desired conversion mode below.
        </p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="mode"
            value="graphql-to-json"
            checked={mode === 'graphql-to-json'}
            onChange={(e) => setMode(e.target.value)}
          />
          GraphQL to JSON
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="json-to-graphql"
            checked={mode === 'json-to-graphql'}
            onChange={(e) => setMode(e.target.value)}
          />
          JSON to GraphQL
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="8"
          placeholder={`Enter ${mode === 'graphql-to-json' ? 'GraphQL query' : 'JSON'} here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <input type="file" onChange={handleFileUpload} style={{ fontSize: '1rem' }} />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Convert'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <h2>Response:</h2>
      <div
        style={{
          background: '#f4f4f4',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          position: 'relative',
          minHeight: '200px',
          overflow: 'auto',
        }}
      >
        <pre style={{ margin: '0', fontFamily: 'monospace' }}>
          {response || 'Your converted result will appear here...'}
        </pre>
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopyToClipboard}
            style={{
              padding: '5px 10px',
              backgroundColor: copied ? '#28a745' : '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: '5px 10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
