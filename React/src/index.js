import React from 'react';
import ReactDOM from 'react-dom/client';
 import Pro from './components/Pro';
import VotingApp from './components/VotingApp';
import Imageproject from './Imageproject';
import ERCtoken from './components/ERCtoken';



const App=()=>{

    return(   

        <div>
   {/* <VotingApp/> */}
   <ERCtoken/>
   {/* <Pro/> */}
      {/* <Imageproject/> */}
        </div>
    )
}
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);