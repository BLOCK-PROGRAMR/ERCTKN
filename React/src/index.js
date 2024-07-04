import React from 'react';
import ReactDOM from 'react-dom/client';
 import Pro from './components/Pro';
import VotingApp from './components/VotingApp';



const App=()=>{

    return(   

        <div>
   <VotingApp/>

        </div>

    )
}
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);