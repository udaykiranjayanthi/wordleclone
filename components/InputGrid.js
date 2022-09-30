import { useState } from "react";

function InputGrid({inputs}) {

  

  return ( 
    <div className="input-container">
      <div className="input-grid">
        {
          inputs.map((word, i) => {
            word = word+"     "
            word = word.slice(0,5)
            return word.split('').map((letter, j) => (
              
              <div key={i+"-"+j} id={i+"-"+j} className="cell" >
                <span>{letter}</span>
              </div>
            ))
          })
        }
      </div>
    </div>
   );
}

export default InputGrid;
// style={{"--cellcolor": "var(--correct)"}}