import React from 'react';
import FIllData from './BT/FIllData';
import { Button } from './components/Buttons/Button';
import PillButton from './components/atoms/Buttons/PillButton';
import FunctionJs from './Js/FunctionJs';
import Test from 'components/pages/Test';
import StoreSetting from 'components/pages/StoreSetting';


function App() {

  return (
    <div>
     {/* <FIllData></FIllData> */}
     <Button type="danger"></Button>
     <FunctionJs></FunctionJs>
      <Test></Test>
      <StoreSetting></StoreSetting>
    
    </div>
  );
}

export default App;
