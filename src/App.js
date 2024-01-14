import './App.css';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import emailFunny from './emailFunny.png'
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const processAudio = (blob) => {
    let reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result);
    }
    reader.readAsDataURL(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.querySelector('.CommandBar').appendChild(audio);
  };

  return (
    <div className="App">
      <div className='IntroBar'>
        <h1>Savant.AI</h1>
        <h2>Here to give you clarity.</h2>
        <p>Just speak into the microphone</p>
        <img src={emailFunny} alt='funny cartoon of email'/>
      </div>
      <div className='CommandBar'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>What do you need?</h2>
          <AudioRecorder 
            onRecordingComplete={(blob) => processAudio(blob)}
            recorderControls={recorderControls}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
