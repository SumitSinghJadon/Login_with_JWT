import React, { useState } from 'react';
import './ImageEditor.css';





const ImageEditor = () => {
  const [Cssfilter, setcssfilter] = useState(100); 
  const [Csscontrast, setCsscontrast] = useState(100);
  const [imgss, setImgss] = useState(null)



  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();    
      reader.readAsDataURL(file);
      reader.onload = (e) => {
          setImgss(e.target.result); 
        
      };
    }
  }

  function applySobelEdgeDetection(ctx, imageWidth, imageHeight) {
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    const data = imageData.data;
  
    // Sobel operator kernels for horizontal and vertical gradients
    const sobelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ];
  
    const sobelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
    ];
  
    // Temporary arrays for gradient values
    const gradientX = [];
    const gradientY = [];
    const gradients = [];
  
    // Compute gradient values
    for (let y = 0; y < imageHeight; y++) {
      for (let x = 0; x < imageWidth; x++) {
        let sumX = 0;
        let sumY = 0;
  
        // Apply the Sobel kernels to find gradients in both x and y directions
        for (let ky = 0; ky < 3; ky++) {
          for (let kx = 0; kx < 3; kx++) {
            const pixelX = x + kx - 1;
            const pixelY = y + ky - 1;
  
            // Handle edge cases (pun intended)
            if (pixelX < 0 || pixelX >= imageWidth || pixelY < 0 || pixelY >= imageHeight) {
              continue;
            }
  
            const offset = (pixelY * imageWidth + pixelX) * 4;
            const pixelValue = data[offset]; // assuming grayscale, so using just R channel
  
            sumX += sobelX[ky][kx] * pixelValue;
            sumY += sobelY[ky][kx] * pixelValue;
          }
        }
  
        gradientX.push(sumX);
        gradientY.push(sumY);
  
        // Combine gradients to find magnitude
        const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
        gradients.push(magnitude, magnitude, magnitude, 255); // R, G, B, Alpha
      }
    }
  
    // Update image data with the computed gradients
    for (let i = 0; i < data.length; i += 4) {
      data[i] = gradients[i];     // R
      data[i + 1] = gradients[i]; // G
      data[i + 2] = gradients[i]; // B
      data[i + 3] = gradients[i]; // Alpha
    }
  
    // Put the updated image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  }
  


  const convertToSketch = () => {
    if (imgss) {
      const image = new Image();
      image.src = imgss;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

       
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;   
          data[i + 1] = avg; 
          data[i + 2] = avg; 
        }

   
        ctx.putImageData(imageData, 0, 0);

        const sketchDataUrl = canvas.toDataURL();
        setImgss(sketchDataUrl);
      };
    }
  };



  return (
    <div className="image-editor">
        <input type="file"  onChange={handleFileUpload}   />
      <h1>Image Editor</h1>
      <div className="image-container">

      {imgss && <img src={imgss} alt="" style={{ filter: `brightness(${Cssfilter}%) contrast(${Csscontrast}%)` }} />}
 
      </div>
      <div className='main-slider'>
      <div className="slider-container">
        <label >Brightness:</label>
        <input
          type="range"                           
          id="brightness-slider"
          min="0"
          max="200"
          value={Cssfilter}
          onChange={(e)=>{setcssfilter(e.target.value)}}
        />
      </div>
      <div className="slider-container">
        <label >contrast:</label>
        <input
          type="range"
          id="hightlight-slider"
          min="0"
          max="200"
          value={Csscontrast}
          onChange={(e)=>{setCsscontrast(e.target.value)}}
        />

      
      </div>
      <button onClick={ convertToSketch } >Apply Sketch Filter</button>

    </div>
      
    </div>
  );
};

export default ImageEditor
