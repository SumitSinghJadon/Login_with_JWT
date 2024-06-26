import React, { useEffect, useState } from 'react';


const TShirtComponent=()=>{
  const [dots, setDots] = useState(() => {
    const storedDots = localStorage.getItem('dots');
    return storedDots ? JSON.parse(storedDots) : [];
  });
    const [dotsColor, setdotsColor] = useState('red')




   
    useEffect(() => {
      localStorage.setItem('dots', JSON.stringify(dots));
      
    }, [dots]); 

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;  
     // const x = 80 
     // const y = 158.4583282470703
      
        console.log("x =",x)
        console.log("y =",y)
        console.log("rect =",rect)
        const newDot = { x, y , dotsColor};

        console.log("sumit",newDot,"jadon")
        setDots([...dots, newDot]);

      };
      
    return(
         <>

         <h1>hello  {dotsColor}</h1>

        <div style={{ position: 'relative', width: '300px', height: '400px' }}>
  
        <img src="imgs/ssc.jpeg"  alt="T-Shirt"  style={{ width: '100%', height: 'auto' }}  onClick={handleClick}/>

    
    
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: dot.x,
              top: dot.y,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: dot.dotsColor,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))
        }
        
      </div>

      <div>
        <input value="red" style={{backgroundColor : "red"}} onClick={(e)=>{setdotsColor(e.target.value)}}/>
        <input value="green" style={{backgroundColor : "green"}} onClick={(e)=>{setdotsColor(e.target.value)}}/>
        <input value="blue" style={{backgroundColor : "blue"}} onClick={(e)=>{setdotsColor(e.target.value)}}/>
      </div>
         </>
    );
}

export default TShirtComponent;