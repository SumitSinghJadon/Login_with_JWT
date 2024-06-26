import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import data from "./data";
import { myproduct } from "./data";

const ChartStudent=()=>{

    const [chartData, setChartData] = useState({});
    const [productData, setproductData] = useState({});
    


    useEffect(() => {
        if (Object.keys(data).length > 0) {
            const percentages = data.map(student => student.percentage);
            const names = data.map(student => student.name);
          

            setChartData({
                options: {
                
                    xaxis: {
                        categories: names
                    }
                },
                series: [
                    {
                        name: "series-1",
                        data: percentages
                    }
                ]
                
            });
        }
    }, [data]);

    
    useEffect(() => {
        if (Object.keys(myproduct).length > 0) {
            var sum=0
            const prices = myproduct.map(product => {
                            sum += product.price;
                            return sum; 
                         });
        console.log("thakur",prices,"sumit")
        
        const Dates = myproduct.map(product => product.purchaseDate);
  
            setproductData({
                options: {
                
                    xaxis: {
                        categories: Dates
                    }
                },
                series: [
                    {
                        name: "series-1",
                        data: prices
                    }
                ]
                
            });
     
  
        }
      
    }, [myproduct]);
  
   
  
  

    return(
        <>
              <div>

{chartData.options && chartData.series ? (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width="1000"
    />
): (
    <p>Loading...</p>
  )}

    </div>


    <div>

{productData.options && productData.series ? (
    <Chart
      options={productData.options}
      series={productData.series}
      type="line"
      width="1000"
    />
): (
    <p>Loading...</p>
  )}

    </div>
        </>
    );

}

export default ChartStudent