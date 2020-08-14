import React from 'react';
import ClosedCaptionPlayer from './components/closed-caption-player';
import './App.css';

const STREAM_PLAYBACK_URL =
  'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';

const App = () => {
  return (
    <div className="App">
      <ClosedCaptionPlayer streamUrl={STREAM_PLAYBACK_URL} />
    </div>
  );
};

export default App;
