import './App.css';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import emailFunny from './emailFunny.png'
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const processAudio = async (blob) => {
    setLoading(true);
    setData(null);
    const formData = new FormData();
    formData.append('file', new File([blob], "audio.mp3"));
    try {
      const response = await fetch('http://localhost:5000/convertToText', {
        method: 'POST',
        body: formData,
      });
      const data_ = await response.json();
      setData(data_.text);
    } catch {
      setData('Oops! We could not process the audio.')
    }
    setLoading(false);
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
        { loading && <div className='Loading'>
          <p>Processing</p>
          <ClipLoader
            color="#19323C"
            loading={true}
            size={28}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div> }
        { data && <p>{data}</p>}
      </div>
    </div>
  );
}

export default App;
