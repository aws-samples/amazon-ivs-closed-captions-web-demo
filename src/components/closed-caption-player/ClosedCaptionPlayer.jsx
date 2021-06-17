import React, { useEffect, useRef, useState } from 'react';

import Placeholder from './placeholder';
import PlayerControls from './PlayerControls';

import './ClosedCaptionPlayer.css';

const ClosedCaptionPlayer = (props) => {
  const { IVSPlayer } = window;
  const { isPlayerSupported } = IVSPlayer;

  const { streamUrl } = props;

  const [captionText, setCaptionText] = useState();
  const [loading, setLoading] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);

  const player = useRef(null);
  const videoEl = useRef(null);

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState;
    const { ERROR, TEXT_CUE } = IVSPlayer.PlayerEventType;

    if (!isPlayerSupported) {
      console.warn(
        'The current browser does not support the Amazon IVS player.',
      );

      return;
    }

    const onStateChange = () => {
      const playerState = player.current.getState();

      console.log(`Player State - ${playerState}`);
      setLoading(playerState !== PLAYING);
    };

    const onError = (err) => {
      console.warn('Player Event - ERROR:', err);
    };

    const onTextCue = (textCue) => {
      setCaptionText(textCue.text);
    };

    player.current = IVSPlayer.create();
    player.current.attachHTMLVideoElement(videoEl.current);

    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);

    player.current.addEventListener(ERROR, onError);
    player.current.addEventListener(TEXT_CUE, onTextCue);

    player.current.load(streamUrl);
    player.current.play();

    return () => {
      player.current.removeEventListener(READY, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(ENDED, onStateChange);

      player.current.removeEventListener(ERROR, onError);
      player.current.removeEventListener(TEXT_CUE, onTextCue);
    };
  }, [IVSPlayer, isPlayerSupported, streamUrl]);

  const toggleCaption = () => {
    setShowCaptions(!showCaptions);
  };

  if (!isPlayerSupported) {
    return null;
  }

  return (
    <div className="stream-wrapper">
      <div className="aspect-16x9">
        <Placeholder loading={loading} />

        <div className="player">
          <video ref={videoEl} className="video-el" playsInline muted></video>

          <div className="player-ui">
            <div className="player-ui-captions">
              {showCaptions && captionText && <p className="player-ui-captions__text">{captionText}</p>}
            </div>

            {player.current && (
              <PlayerControls
                player={player.current}
                hasCaptionTrack={captionText !== undefined}
                showCaptions={showCaptions}
                toggleCaption={toggleCaption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedCaptionPlayer;
