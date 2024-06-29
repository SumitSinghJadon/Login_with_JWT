import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const ExcelShow = () => {
  const [data, setData] = useState([]);
  const [sendData, setSendData] = useState([])
  const header=data[0]

  console.log(sendData)

  const saveData=()=>{
    let url=`http://127.0.0.1:8000/ExcelDataShow/`
    axios.post(url,{sendData, header}).then((res)=>{
      alert(res.data)
    })
  }
  
  const sendRows=(e)=>{

  if(e.target.checked){
    const value = JSON.parse(e.target.value);

     setSendData(values=>([...values,value]));
    
    
    
    
  }

  else{
    let valueData = sendData.filter((key)=>key[0]!==e.target.value[0])
    setSendData(valueData)
  }
  }

  // console.log("value =",value)

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parseData);
    };


  };


  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      <div>
        {data.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-white divide-y divide-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300" >Checkbox</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300" >Edit</th>
                {data[0].map((header, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    <input type="checkbox" value={JSON.stringify(row)} onChange={(e)=>sendRows(e)}/>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  <button>Edit</button>
                  </td>
                  {data[0].map((header, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">                  
                      {row[cellIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button type="submit" onClick={saveData}>Save Data</button>
      </div>
    </>
  );
};

export default ExcelShow;




