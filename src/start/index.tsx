import React from 'react';
import ReactDOM from 'react-dom';
 

 
export interface StartProps {}

const Start: React.FC<StartProps> = () => {
  return (
    <div>hello</div>
  );
};

 ReactDOM.render(<Start />, document.querySelector('#app') as HTMLDivElement);
