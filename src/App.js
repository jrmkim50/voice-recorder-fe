import './App.css';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

function App() {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.querySelector('.CommandBar').appendChild(audio);
  };

  return (
    <div className="App">
      <div className='IntroBar'>
        <h1>Deep Email Search</h1>
        <h2>Here to give you clarity.</h2>
        <p>Just speak into the microphone</p>
      </div>
      <div className='CommandBar'>
        <h2>What do you need?</h2>
        <AudioRecorder 
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
      </div>
    </div>
  );
}

export default App;
