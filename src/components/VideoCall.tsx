// components/EmbeddedVideoCall.tsx
import React, { useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

const VideoCall: React.FC = () => {
  const callFrameRef = useRef<any>(null);

  useEffect(() => {
    const callFrame = DailyIframe.createFrame({
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
      },
      customLayout: true,
    });
  
    callFrame.join({ url: 'https://demo.daily.co/hello' });
  
    const container = document.getElementById('video-inline-container');
    if (container && callFrame.iframe) {
      container.innerHTML = '';
      const iframeElement = callFrame.iframe();
      if (iframeElement) {
        container.appendChild(iframeElement);
      }
    }
  
    return () => {
      callFrame.leave();
    };
  }, []);
  

  return <div id="video-inline-container" className="w-full h-full" />;
};

export default VideoCall;