import React, { memo, useState } from 'react';
import './style/index.less';
import Dialog from '../dialog/index';
import ReactDOM from 'react-dom/client';

export interface DemoProps { }

const Demo: React.FC<DemoProps> = () => {
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>();

  const popWindow = (bol:boolean) => {
    setVisible(bol);
  }

  const closeWindow = (value:number)=>{
    setCount(count+value);
    popWindow(false);
  }
  return (
    <div className='demo'>
      总数  {count}
      <button onClick={()=>popWindow(true)}>弹出弹窗并添加</button>
      {
        visible?<Dialog closeWindow={closeWindow} windowControl={popWindow}/> :null
      }

    </div>
  );
};

// export default memo(Demo);
ReactDOM.createRoot(document.querySelector('#app') as HTMLDivElement).render(<Demo />);

