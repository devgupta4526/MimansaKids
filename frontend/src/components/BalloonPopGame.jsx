import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Balloon from './Balloon'; // Balloon component import
import GameOverScreen from './GameOverScreen'; // Import the new GameOverScreen component
import './BalloonPopGame.css'; // Import the custom CSS

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function BalloonPopGame() {
  const navigate = useNavigate(); // Create navigate function
  const [balloons, setBalloons] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRising, setIsRising] = useState(false);

  const popSound = new Audio('/burst.wav');
  const cheerSound = new Audio('/kids_cheering.mp3');

  const balloonImages = [
    '/balloon1.png',
    '/balloon2.png',
    '/balloon3.png',
    '/balloon4.png',
    '/balloon5.png',
  ];

  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = 'en-IND';
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript.trim();
          }
        }

        setTranscript(finalTranscript);

        if (finalTranscript.toLowerCase().includes('pop') || finalTranscript.toLowerCase().includes('bob')) {
          popBalloon();
        }
      };

      setRecognition(recognitionInstance);
    }

    addInitialBalloons();
  }, []);

  useEffect(() => {
    // Stop listening when the game is over
    if (gameOver && recognition) {
      recognition.stop();
      setListening(false);
    }
  }, [gameOver, recognition]);

  const addInitialBalloons = () => {
    setIsRising(true);
    const initialBalloons = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      popped: false,
      image: balloonImages[i],
    }));
    setBalloons(initialBalloons);

    setTimeout(() => {
      setIsRising(false);
    }, 1000);
  };

  const startListening = () => {
    if (recognition && !listening && !gameOver) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  };

  const popBalloon = () => {
    setBalloons((prevBalloons) => {
      const firstUnpopped = prevBalloons.find((balloon) => !balloon.popped);
      if (firstUnpopped) {
        popSound.play();
        cheerSound.play();
        setScore((prevScore) => prevScore + 1);

        const updatedBalloons = prevBalloons.map((balloon) =>
          balloon.id === firstUnpopped.id ? { ...balloon, popped: true } : balloon
        );

        if (updatedBalloons.every((balloon) => balloon.popped)) {
          setTimeout(() => {
            setGameOver(true);
          }, 1000);
        }

        return updatedBalloons;
      }
      return prevBalloons;
    });
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    addInitialBalloons();
  };

  const goToWaitlist = () => {
    navigate('/waitlist'); // Navigate to the Waitlist
  };

  const goToStartScreen = () => {
    if(gameOver){
      setGameOver(false);
    }
    else{
    navigate('/'); // Navigate to the BalloonStartScreen
    }
  };

  const formattedScore = score.toString().padStart(3, '0').split('');

  const getBalloonStyle = (index) => {
    const zigzagOffset = 90;
    const verticalOffset = index % 2 === 0 ? zigzagOffset : -zigzagOffset;
    return {
      transform: `translateY(${verticalOffset}px)`,
      margin: '60px',
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#FFEBDA] to-[#FBD5B5] relative">
      <div className="flex w-full justify-between items-center px-5 py-2">
        <button className="icon-button" onClick={goToStartScreen}>
          <img src="/back.png" alt="Back" />
        </button>

        {/* Hide score display and reset/play buttons when game over */}
        {!gameOver && (
          <div className="flex flex-col items-center justify-center ml-28">
            <h1 className="font-bold text-xl">Score</h1>
            <div className="score-box-container">
              {formattedScore.map((digit, index) => (
                <div key={index} className="score-box">
                  {digit}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {/* Hide reset and play buttons when game over */}
          {!gameOver && (
            <>
              <button className="icon-button" onClick={resetGame}>
                <img src="/reset.png" alt="Reset" />
              </button>
              <button className="icon-button" onClick={listening ? stopListening : startListening}>
                <img src={listening ? '/play.png' : '/play.png'} alt="Play/Pause" />
              </button>
            </>
          )}
          <button className="icon-button" onClick={goToStartScreen}>
            <img src="/home.png" alt="Home" />
          </button>
        </div>
      </div>

      {gameOver ? (
        <GameOverScreen onPlayAgain={resetGame} onExit={goToWaitlist} />
      ) : (
        <div className="flex justify-center items-center mt-40">
          <div className="flex justify-center items-center">
            {balloons.map((balloon, index) => (
              <div key={balloon.id} style={getBalloonStyle(index)}>
                <Balloon isPopped={balloon.popped} imageSrc={balloon.image} isRising={isRising} />
              </div>
            ))}
          </div>
        </div>
      )}

      {listening && (
        <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-2xl text-[#101010]">
          Listening for "pop"... 🎤
        </p>
      )}
      {listening && transcript && (
        <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-[#101010] text-xl">
          Heard: "{transcript}"
        </p>
      )}
    </div>
  );
}

export default BalloonPopGame;
