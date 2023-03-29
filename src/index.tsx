import React from 'react';
import ReactDOM from 'react-dom/client';
 
export interface MatchProps {}

function Index(){
  return (
    <div>hello</div>
  );
};

ReactDOM.createRoot( document.querySelector('#app') as HTMLDivElement).render(<Index />);
