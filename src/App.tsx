import React from 'react';
import FIllData from './BT/FIllData';
import { Button } from './components/Buttons/Button';
import PillButton from './components/atoms/Buttons/PillButton';
import FunctionJs from './Js/FunctionJs';
import Test from 'components/pages/Test';
import StoreSetting from 'components/pages/StoreSetting';
import AreaMst from 'components/pages/areaMst/AreaMst';
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <div>
     {/* <FIllData></FIllData> */}
     <Button type="danger"></Button>
     <FunctionJs></FunctionJs>
      <Test></Test>
      <StoreSetting></StoreSetting>
      <BrowserRouter>
        <AreaMst></AreaMst>
      </BrowserRouter>
    </div>
  );
}

export default App;
