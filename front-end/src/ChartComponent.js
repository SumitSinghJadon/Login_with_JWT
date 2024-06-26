import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";
  

const ChartComponent = () => {    
    const [chartData, setChartData] = useState({});
    const [data, Setdata] =useState({})
    const [pie,Setpie] = useState({})
    const fetchData=()=>{
       let api="http://127.0.0.1:8000/ChartData/"
       axios.get(api).then((res)=>{
        Setdata(res.data)
       })
    }
    useEffect(()=>{
          fetchData();
    }, [])

    useEffect(() => {
      if (Object.keys(data).length > 0) {
          const daysOfWeek = Object.keys(data);
          const values = Object.values(data);

          setChartData({
              options: {
                  xaxis: {
                      categories: daysOfWeek
                  }
              },
              series: [
                  {
                      name: "series-1",
                      data: values
                  }
              ]
              
          });
   

        Setpie({
          series: values,
          labels: daysOfWeek

        });
      }
    
  }, [data]);

 



    return (
        <>
            <h1>hello</h1>
            <div>

        {chartData.options && chartData.series ? (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="500"
            />
        ): (
            <p>Loading...</p>
          )}
    
            </div>

            <div>

{chartData.options && chartData.series ? (
    <Chart
      options={chartData.options}
      series={chartData.series}
  
      type="line"
      width="500"
    />
): (
    <p>Loading...</p>
  )}

    </div>
     <div>
        {pie.labels && pie.series ? (
            <Chart
                  options={{
                    labels: pie.labels,
                    dataLabels: {
                        enabled: true,
                    },
                }}
                series={pie.series}
                type="pie"
                width="500"
            />
        ) : (
            <p>Loading...</p>
        )}
    </div> 

        </>
    );

}
export default ChartComponent;



