import React, { useEffect, useState } from 'react';

import {
  Play,
  Pause,
  VolumeOff,
  VolumeUp,
  ClosedCaption,
  ClosedCaptionDisabled,
} from '../../assets/icons';

const PlayerControls = (props) => {
  const { hasCaptionTrack, player, showCaptions } = props;

  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setMuted(player.isMuted());
  }, [player]);

  const toggleMute = () => {
    const shouldMute = !player.isMuted();

    player.setMuted(shouldMute);
    setMuted(shouldMute);
  };

  const togglePause = () => {
    const shouldPause = !player.isPaused();

    if (shouldPause) {
      player.pause();
    } else {
      player.play();
    }

    setPaused(shouldPause);
  };

  return (
    <div className="player-ui-controls">
      <div className="player-ui-controls__actions player-ui-controls__actions--left">
        <button className="player-ui-button" onClick={togglePause}>
          {paused ? <Play /> : <Pause />}
        </button>

        <button className="player-ui-button" onClick={toggleMute}>
          {muted ? <VolumeOff /> : <VolumeUp />}
        </button>
      </div>

      <div className="player-ui-controls__actions player-ui-controls__actions--right">
        {hasCaptionTrack && (
          <button
            className="player-ui-button"
            onClick={props.toggleCaption}
          >
            {showCaptions ? <ClosedCaption /> : <ClosedCaptionDisabled />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerControls;
