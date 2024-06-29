import React, { useState, useCallback } from 'react';
import QrReader from 'react-qr-scanner';

const Test = () => {
 
  const [result, setResult] = useState('No result');

  const handleScan = useCallback((data) => {
    if (data) {
      setResult(data.text);
    }
  }, []);

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <QrReader
        delay="100"
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
    </div>
  );
};

export default Test;

