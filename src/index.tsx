import React from 'react';
import ReactDOM from 'react-dom/client';
//  import Demo from './demo/index';
 
export interface MatchProps {}

function Index(){
  return (
    //  <Demo />
    <div>hello</div>
  );
};

ReactDOM.createRoot( document.querySelector('#app') as HTMLDivElement).render(<Index />);
