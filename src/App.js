import './App.css';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Typewriter from './Typewriter';

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
      var msg = new SpeechSynthesisUtterance();
      msg.text = data_.text;
      window.speechSynthesis.speak(msg);
    } catch {
      setData('Oops! We could not process the audio.')
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 style={{ margin: 0 }}>Savant.AI</h1>
      <h2 style={{ marginTop: 0 }}>Here to give you <span className='Underlined'>clarity</span>.</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '10px', marginTop: 20, marginBottom: 20 }}>What do you need?</p>
        <AudioRecorder 
          onRecordingComplete={(blob) => processAudio(blob)}
          recorderControls={recorderControls}
        />
      </div>
      { loading && <div className='Loading'>
          <p>Processing</p>
          <ClipLoader
            color="#F7F7FF"
            loading={true}
            size={28}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div> }
      { data && <div className='Answer'><Typewriter text={data} delay={80}/></div>}
    </div>
  );
}

export default App;
