import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import InputGrid from '../components/InputGrid'
import Keyboard from '../components/Keyboard'
import useEventListener from '../utils/useEventListener'
import Snackbars from '../components/Snackbars'
import PopupModal from '../components/PopupModal'
import BaseLayout from '../components/BaseLayout'
import { fetchRandomWord, isWordInDB } from '../utils/firebase'


export default function Home() {
  const [inputs, setInputs] = useState( ["","","","","",""] );
  const [emojiGrid, setEmojiGrid] = useState([]);
  const [letterStates, setLetterStates] = useState({});
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState("");
  const [snackPack, setSnackPack] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [finishStatus, setFinishStatus] = useState("");
  const [answer, setAnswer] = useState("");

  //resetAllstates used so far
  const restartGame = () => {
    setInputs( ["","","","","",""] );
    setEmojiGrid([]);
    setLetterStates({});
    setCurrentRow(0);
    setWord("");
    setSnackPack([]);
    setModalOpen(false);
    setFinishStatus("");

    getAnswerWord(); // to update new answer

    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].setAttribute("style", "");
      cells[i].setAttribute("class", "cell");
    }
  }



  function getAnswerWord() {

    fetchRandomWord().then((word) => {
      setAnswer(word.toUpperCase());
    }).catch(() => {
      handleSnackbarMessage("Error occured. Please refresh");
    })

  }

  useEffect(() => {
    if(localStorage.getItem("userData") === null){
      const userData = {
        guessDistribution: [0, 0, 0, 0, 0, 0],
        totalGames: 0,
        currentStreak: 0,
        maxStreak: 0
      }
      localStorage.setItem("userData", JSON.stringify(userData) );
    }
    getAnswerWord();

  }, []);

  useEffect(() => {
    //add animation everytime word updates
    toggleInputAnimation();
    
    setInputs(inputs => {
      inputs[currentRow]  = word;
      return [...inputs];
    });
  }, [word]);

  const handleSnackbarMessage = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };
  
  //event listner function
  const handleUserKeyPress = (e) => {
    let charCode = e.keyCode;
    handleInput(charCode);
  };

  //handle inputs from keydown listner and virtual keyboard
  const handleInput = (charCode) => {
    if(finishStatus === "completed" || finishStatus === "failed")
      return
    
    if(modalOpen)
      return

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){
      setWord(word => (word+String.fromCharCode(charCode).toUpperCase()).slice(0,5));

    }
    // BackSpace
    else if(charCode == 8){
      setWord(word => word.slice(0,-1));
    }
    // Enter
    else if(charCode == 13){
      checkValidWord();
    }
  }

  //create event listner
  useEventListener('keydown', handleUserKeyPress);


  //check valid word
  const checkValidWord = async () => {
    //if a valid word - reveal the word and letter states
    //valid word => 5 characters, should not already exist, proper english word.
    
    if(word.length===5 && !inputs.slice(0,currentRow).includes(word) && await isWordInDB(word)){

      const emojiRow = "";
      const states = getAllLetterStates(word, answer);

      for(var i=0; i<5; i++){
        let cell = document.getElementById(currentRow+"-"+i);

        if(cell !== null){
          //flip animation duration -> 0.5 secs
          cell.classList.add("cell-flip-anim");
          cell.setAttribute("style", "--flipDelay: "+(0.3*i)+"s");

          //update cell color during half animation
          setTimeout(() => {
            cell.classList.add("color-change-during-flip");
          }, 300*i+250); 

          //wait to finish animation(delay+duration) and remove animation
          setTimeout(() => {
            cell.classList.remove("cell-flip-anim");
          }, 300*i+500); 

          //state, colors, keyboard, emojis

          let letter = word[i];
          const state = states[i];

          //for cell color after reveal
          cell.classList.add(state);
          
          //for Emoji Grid to share
          state === "completed" && (emojiRow += "⬛");
          state === "correct" && (emojiRow += "🟩");
          state === "exists" && (emojiRow += "🟨");

          //update/override letter states (for virtual keyboard purpose) after animation completes
          setTimeout(() => {
            if(state === "correct"){
              updateLetterStates(letter, state);
            }
            else if(state === "exists" && letterStates[letter] !== "correct"){
              updateLetterStates(letter, state);
            }
            else if(letterStates[letter] !== "correct" && letterStates[letter] !== "exists"){
              updateLetterStates(letter, state);
            }
          }, 300*4+500);
          

          //add jump animation and pop up if word is right
          if(word === answer){
            let successDelay = 0.1*i;
            setTimeout(() => {
              cell.classList.add("cell-success-anim");
              cell.setAttribute("style", "--successDelay: "+successDelay+"s");
            }, 300*4+500);

            setTimeout(() => {
              setFinishStatus("completed");
            }, 300*4+500+1500);
            
          }
        }
      }
      // update EmojiGrid
      setEmojiGrid(prevGrid => {
        prevGrid[currentRow] = emojiRow;
        return [...prevGrid]
      });

      if(word === answer){
        //update local storage when data if game completed
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.totalGames += 1;
        userData.guessDistribution[currentRow] += 1;
        userData.currentStreak += 1;
        if(userData.currentStreak > userData.maxStreak){
          userData.maxStreak = userData.currentStreak;
        }
        localStorage.setItem("userData", JSON.stringify(userData) );
      }
        

      if(currentRow !== 5){
        setCurrentRow(row => row+1);
        setWord("");
      }
      //failure case (6/6 guess completed)
      else if(currentRow === 5 && word !== answer){
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.currentStreak = 0;
        userData.totalGames += 1;
        localStorage.setItem("userData", JSON.stringify(userData) );

        handleSnackbarMessage(answer);
        
        setTimeout(() => {
          setFinishStatus("failed");       
        }, 300*4+500+1500);
      }
    }

    //if invalid word
    else{
      if(word.length !==5){
        handleSnackbarMessage("Not enough letters");
      }
      else if(inputs.slice(0,currentRow).includes(word)){
        handleSnackbarMessage("Word already exists");
      }
      else{
        handleSnackbarMessage("Not in word list")
      }

      for(var i=0; i<5; i++){
        let cell = document.getElementById(currentRow+"-"+i);
        if(cell !== null){
          cell.classList.add("cell-shake-anim");
          setTimeout(() => {
            cell.classList.remove("cell-shake-anim");
          }, 300);
        }
      }
    }
  }

  //store states for keyboard coloring
  const updateLetterStates = (letter, state)=>{
    setLetterStates(letterStates => {
      letterStates[ letter ] = state;
      return {
        ...letterStates,
      };
      
    });
  }

  //Check state of all letters in the current word
  //It is a bit more complex than getting individual states of letters considering the case of letters may repeat ans we have to show colors accordingly
  const getAllLetterStates = (word, answer) => {
    //converting strings to array to make them mutable
    word = word.split("");
    answer = answer.split("");

    let states = [];
    //for completed case
    for(let i=0; i<word.length; i++){
      if(answer[i] === word[i]){
        states[i] = "correct";
        answer[i] = ""; 
        word[i] = "";
      }
    }
    //for exists case
    for(let i=0; i<word.length; i++){
      if(word[i] !== "" && answer.includes(word[i])){
        states[i] = "exists";
        answer[answer.indexOf(word[i])] = "";
        word[i] = "";
      }
    }
    //for completed case
    for(let i=0; i<word.length; i++){
      if(word[i] !== ""){
        states[i] = "completed";
        answer[i] = "";
        word[i] = "";
      }
    }
    return states;
  }



  //add animation to current letter added
  const toggleInputAnimation = (isAdded) => {
    
    const currentPostion = currentRow+"-"+(word.length-1);
    let cell = document.getElementById(currentPostion);
    if(cell !== null){
      //condition - don't add animation when coming from backspace
      if(!cell.classList.contains("active")){
        cell.classList.add("active");
        cell.classList.add("cell-input-anim");
        setTimeout(() => {
          cell.classList.remove("cell-input-anim");
        }, 100);
      }
    }
    const nextPostion = currentRow+"-"+(word.length);
    let nextCell = document.getElementById(nextPostion);
    if(nextCell !== null){
      nextCell.classList.remove("active");
    }
  }

  return (
  
    <BaseLayout setModalOpen={setModalOpen}>

      <Head>
        <title>Wordle</title>
      </Head>


        <Snackbars snackPack={snackPack} setSnackPack={setSnackPack}/>
        <PopupModal emojiGrid={emojiGrid} open={modalOpen} setOpen={setModalOpen} finishStatus={finishStatus} restartGame={restartGame}/>

        <div className='layout'>
          <InputGrid inputs={inputs}/>
          <Keyboard letterStates={letterStates} handleInput={handleInput} currentRow={currentRow} />
        </div>

    </BaseLayout>
    
  )
}
