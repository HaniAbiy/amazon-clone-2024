import { useContext, useEffect, useState } from 'react'

import './App.css'
import RoutingPages from './RoutingPages'
import { DataContext} from './Components/DataProvider/DataProvider';
import { auth } from './Utility/firebase';
import { Type } from './Utility/action.type';


function App() {
  const [{user}, dispatch]=useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else {
        dispatch({
          type:Type.SET_USER,
          user:null
        });
      }
    })    
    
  }, []);
 

  return (
    <>
  
    <RoutingPages />
   
    </>
  )
}

export default App