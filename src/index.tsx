import React from 'react';
import ReactDOM from 'react-dom/client';
 

 
export interface MatchProps {}

const Index: React.FC<MatchProps> = () => {
  return (
    <div>hello</div>
  );
};

ReactDOM.createRoot( document.querySelector('#app') as HTMLDivElement).render(<Index />);
