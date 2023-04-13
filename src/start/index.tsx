import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { adult} from "@utils/name";


 
export interface StartProps {};
function Start(){

  useEffect(()=>{
     console.log('hello');
     const div = <div>hhh</div>
  },[])


  return (
    <div>hello</div>
  );
};

 ReactDOM.createRoot( document.querySelector('#app') as HTMLDivElement).render(<Start />);
