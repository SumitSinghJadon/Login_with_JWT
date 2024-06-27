import { Link,Outlet } from "react-router-dom";

const LayOut=()=>{
    return(
        <>
        <div class="w-[1000px] flex justify-around p-4">
          <Link to={'Notification'} class="text-blue-500 hover:text-blue-700">Notification</Link>
          <Link to={'ApplyLeave'} class="text-blue-500 hover:text-blue-700">ApplyLeave</Link>
          <Link to={'WebSocketComponent'} class="text-blue-500 hover:text-blue-700">WebSocketComponent</Link>
          <Link to={'ChartComponent'} class="text-blue-500 hover:text-blue-700">ChartComponent</Link>
          <Link to={'ChartStudent'} class="text-blue-500 hover:text-blue-700">ChartStudent</Link>
          <Link to={'TShirtComponent'} class="text-blue-500 hover:text-blue-700">TShirtComponent</Link>
          <Link to={'ImageEditor'} class="text-blue-500 hover:text-blue-700">ImageEditor</Link>
          <Link to={'login'} class="text-blue-500 hover:text-blue-700">login</Link>
          <Link to={'dropdownLogin'} class="text-blue-500 hover:text-blue-700">dropdownLogin</Link>
          <Link to={'Test'} class="text-blue-500 hover:text-blue-700">Test</Link>
        </div>
        <Outlet />
      </>
      
    );
}

export default LayOut;