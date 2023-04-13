import React, { memo, useState } from 'react';
import './style/index.less';

export interface DialogProps {
  closeWindow:(val:number)=>void;
  windowControl:(bol:boolean)=>void;
}

const Dialog: React.FC<DialogProps> = ({
  closeWindow,windowControl
}) => {
 const [inputValue,setInputValue] = useState<number>(0);
  const handleClean = ()=>{
    setInputValue(0);
  }
  function isNumber(val:any) {  
    return !isNaN(parseFloat(val)) && isFinite(val);  
  }

  const handleChange=(e)=>{
    const num =  e.target.value;
    if(isNumber(num)){
      setInputValue(num);
    }else{
      alert('请输入数字')
    }
  }
  return (
    <div className='dialog'>
      <div className='dialog-window'>
          <div className='close-btn' onClick={()=>windowControl(false)}>关闭</div>
          <input value={inputValue} onChange={handleChange}/>
          <div> 双倍数量：{inputValue*2}</div>
          <div className='control-btn'>
            <button onClick={handleClean}>清空</button>
            <button onClick={()=>closeWindow(inputValue)}>确认</button>
          </div>
      </div>
    </div>
  );
};

export default memo(Dialog);
