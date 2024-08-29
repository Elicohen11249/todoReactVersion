import Login from './Login';
import AuthContext from './auth';
import Todos from './Todos.jsx';
import './App.css';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './SignUp.jsx';


function App() {
  const [currentUser, setCurrentUser] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setCurrentUser={setCurrentUser} />
    },
    {
      path:"/SignUp",
      element:<SignUp setCurrentUser={setCurrentUser}/>
    },
    {
      path:"/Login",
      element:<Login setCurrentUser={setCurrentUser}/>
    },
    {
      path: "/Todos",
      element: <Todos />
    }
  ]);

  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  )
}

export default App
