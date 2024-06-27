import ApplyLeave from './ApplyLeave';
import LayOut from './LayOut';
import Notification from './Notification';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import WebSocketComponent from './WebSocketComponent';
import ChartComponent from './ChartComponent';
import ChartStudent from './ChartStudent';
import TShirtComponent from './TShirtComponent';
import ImageEditor from './ImageEditor';
import Login from './Login';
import DropdownLogin from './DropdownLogin';
import Test from './Test';



const App = () => {
  return (
   <>

   <BrowserRouter>
   <Routes>
    <Route path='/' element={<LayOut/>}>
    <Route index element={<Notification/>}/>
    <Route path='Notification' element={<Notification/>}/>
    <Route path='ApplyLeave' element={<ApplyLeave/>}/>
    <Route path='WebSocketComponent' element={<WebSocketComponent/>}/>
    <Route path='ChartComponent'  element={<ChartComponent/>}/>
    <Route path='ChartStudent'  element={<ChartStudent/>}/>
    <Route path='TShirtComponent' element={<TShirtComponent/>}/>
    <Route path='ImageEditor' element={<ImageEditor/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='dropdownLogin' element={<DropdownLogin/>}/>
    <Route path='Test' element={<Test/>}/>

    </Route>
   </Routes>
   </BrowserRouter>



   </>
  );
};

export default App;

