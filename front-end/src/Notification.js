import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    const [val, setVal] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        displayNotifications();
    }, [messages]);

    const handleSubmit = (type) => {
        if (val.trim() !== "") {
            setMessages([...messages, { type, message: val }]);
            setVal("");
        } else {
            toast.error("Please enter a message!");
        }
    };
    const displayNotifications = () => {
      const uniqueMessages = new Set();
      messages.forEach(({ type, message }) => {
          const key = type + message;
          if (!uniqueMessages.has(key)) {
              uniqueMessages.add(key);
              if (type === 'success') {
                  toast.success(<div>{message}</div>,{ theme: "colored", autoClose: 6000 });
              } else if (type === 'error') {
                  toast.error(<div>{message}</div>,{ theme: "colored", autoClose: 6000 });
              } else if (type === 'warning') {
                  toast.warning(<div>{message}</div>,{ theme: "colored", autoClose: 6000 });
              } else {
                  toast.info(<div>{message}</div>,{ theme: "colored", autoClose: 6000 });
              }
          }
      });
  };
  
    return (
        <>
         <>
  <div class="p-4">
    <h1 class="text-lg font-semibold mb-4">Notification</h1>
    <input
      name="message"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      class="w-[300px] px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    />
    <div class="space-x-2">
      <button
        type="submit"
        onClick={() => handleSubmit('success')}
        class="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
      >
        Success
      </button>
      <button
        type="submit"
        onClick={() => handleSubmit('error')}
        class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
      >
        Error
      </button>
      <button
        type="submit"
        onClick={() => handleSubmit('warning')}
        class="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
      >
        Warning
      </button>
    </div>
    <ToastContainer />
  </div>
</>

        </>
    );
};
export default Notification;
