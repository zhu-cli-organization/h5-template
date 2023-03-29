import React from 'react';
import ReactDOM from 'react-dom/client';
 

 
export interface StartProps {}

function Start(){
  return (
    <div>hello</div>
  );
};

 ReactDOM.createRoot( document.querySelector('#app') as HTMLDivElement).render(<Start />);
