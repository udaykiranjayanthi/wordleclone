import { BackspaceOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Keyboard({handleInput, letterStates, currentRow}) {
  const row1 = "QWERTYUIOP";
  const row2 = "ASDFGHJKL";
  const row3 = "ZXCVBNM";

  useEffect(() => {
    for(let i=0; i<currentRow; i++){

    }
  }, [currentRow])

  return ( 
    <div className="keyboard-container">
      <div className="keyboard">
        <div className="row">
          {
            row1.split('').map((letter, ind) => (
              <Button key={letter} onClick={() => handleInput(letter.charCodeAt(0))} variant="contained" fullWidth={false} className={"btn "+letterStates[letter]}>
                {letter}
              </Button>
            ))
          }

        </div>
        <div className="row">
          {
            row2.split('').map((letter, ind) => (
              <Button key={letter} onClick={() => handleInput(letter.charCodeAt(0))} variant="contained" fullWidth={false} className={"btn "+letterStates[letter]}>
                {letter}
              </Button>
            ))
          }

        </div>
        <div className="row">
          <Button variant="contained" onClick={() => handleInput(13)} fullWidth={false} className="btn btn-enter">
            ENTER
          </Button>
          {
            row3.split('').map((letter, ind) => (
              <Button key={letter} onClick={() => handleInput(letter.charCodeAt(0))} variant="contained" fullWidth={false} className={"btn "+letterStates[letter]}>
                {letter}
              </Button>
            ))
          }
          <Button variant="contained"  onClick={() => handleInput(8)}  fullWidth={false} className="btn btn-back">
            <BackspaceOutlined fontSize="small"/>
          </Button>
        </div>
      </div>
    </div>
   );
}

export default Keyboard;