import { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import PopupModal from "../components/PopupModal";
import Head from "next/head";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
// import Router from "next/router";

function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return ( 
    <BaseLayout setModalOpen={setModalOpen}>

      <Head>
        <title>About | Wordle</title>
      </Head>


        <PopupModal emojiGrid={[]} open={modalOpen} setOpen={setModalOpen} finishStatus={""} restartGame={() => router.push('/')}/>

        <Container>
          <div className="about-container">
            <h4 className="head">How to play?</h4>
            <p>For every game, there will be a secret random 5 letter word to guess. Guess the word in 6 tries. Each guess must be a valid 5-letter word. Hit the enter button to submit. After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
            <br/>
            <p><strong>EXAMPLE</strong></p>
            <div className="example-box">
              <div className="input-grid">
                <div className="cell color-change-during-flip exists">R</div>
                <div className="cell color-change-during-flip correct">E</div>
                <div className="cell color-change-during-flip ">A</div>
                <div className="cell color-change-during-flip exists">C</div>
                <div className="cell color-change-during-flip ">T</div>
              </div>
              <div className="description">
                <p>If your guess is a valid 5 letter English word, the tiles for that guess will flip and reveal details about it.</p>
                <p><strong>A, T</strong> aren't in the target word at all.</p>
                <p><strong>R, C</strong> are in the word but in the wrong spot.</p>
                <p><strong>E</strong>  is in the word and in the correct spot.</p>
                <p>The same will also be reflected on virtual keyboard to help you on the next guess. You will win the game if your guess is finally equal to the <strong>secret word</strong> out of given 6 chances</p>
              </div>
            </div>
              
            <br/>
            <p><strong>DEVELOPER</strong></p>

            <div className="contact">
              <div className="image">
                <img src="/uday.png"/>
                
              </div>
              <div className="content">
                <p><strong>UDAY KIRAN JAYANTHI</strong></p>
                <p>A Software Engineer by profession. Creative and passionate in full stack web development. Expertice in CSS, JavaScript, React, NextJS, Python, SpringBoot, MySQL, MongoDB, etc.</p>
                <p>Follow me on <a href="https://www.linkedin.com/in/uday-kiran-jayanthi/" target="_blank" style={{color: '#0a66c2', fontWeight: '600', }}>LinkedIn</a></p>
              </div>
            </div>

            <br/>
            <h4 className="head">Note</h4>
            <p>The Wordle Game is not affiliated with "Wordle" by NYTimes in any way. This game is not intented for any commercial purpose.</p>
            
          </div>
        </Container>
        

    </BaseLayout>
   );
}

export default About;