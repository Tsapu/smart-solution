import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import GlobalAudio from './GlobalAudio';
import Selector from './Selector';

import './App.css';
import BarChart from "./BarChart";
import {
  MainContainer,
  BarContainer,
} from "./styles";

const config = {
  one: {
    color: "#e0a106"
  },
  two: {
    color: "#e0064e"
  },
  three: {
    color: "#1da890"
  },
  four: {
    color: "#7ca81d"
  }
}



export default function App() {

  const [data, setData] = useState({one: 25, two: 25, three: 25, four: 25});
  const [laser, activateLaser] = useState(false);
	const [ws, setWs] = useState(new WebSocket(`ws://localhost:5000/subscribe`)); // "ws://localhost:5000/subscribe"`ws://localhost:3000/subscribe`
  const [muted, setMute] = useState(true);
  const [samples, setSamples] = useState(["garage1", "guitar1", "bass1", "house1"]);

  const triggerLaser = () => {
    activateLaser(true);
    setTimeout(() => {
      activateLaser(false);
    }, "1300")
  }

  function generateDrop() {
    const dropList = [];
      for (var i = 0; i < 4; i++) {
        dropList.push(<Selector index={i} select={setItem}></Selector>)
  }}

  const setItem = (index, key) => {
    console.log(index, key)
    let newSamples = [...samples];
    newSamples[index] = key;
    setSamples(newSamples);
  }

  useEffect(() => {
    ws.onmessage = (msg) => {
      const json = JSON.parse(msg.data);
      console.log(json);
      if (Object.keys(json)[0] == "laser") {
        console.log("LAAAAAAAAAAAAAAAAAAAASSEEEEERS")
        triggerLaser();
      } else {
        setData(json);
      }
      console.log(data);
    }
		ws.onopen = () => {
			console.log('WebSocket Connected');
		}
		return () => {
			ws.onclose = () => {
				console.log('WebSocket Disconnected');
				setWs(new WebSocket(URL));
			}
		}
	}, [ws.onopen, ws.onclose])

  return (
    <>
    {
      muted &&
      <div className="mute-btn" onClick={() => setMute(false)}>
        <img className="padding" src="/mute.png"></img> 
      </div>
    }
    {
      !muted &&
      <div className="mute-btn large" onClick={() => setMute(true)}>
        <img src="/unmuted.webp"></img> 
      </div>
    }
    {
      laser ?
      <div className="laser"></div>
      : <div className="smart">smart solution</div>
    }
    <div className="animation-container">
      <div className="lightning-container">
        <div className="lightning white"></div>
        <div className="lightning red"></div>
      </div>
      <div className="boom-container">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape triangle big yellow"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container second">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
    </div>
    <BarContainer> 
      <MainContainer>
        {
          !muted && <>
          <GlobalAudio volume={data} audio={samples}></GlobalAudio>
          { laser && <ReactAudioPlayer
            src="audio/blue.wav"
            autoPlay
            volume={1}
          />
          }
        </>
        }
        <BarChart height={data.one} color={config.one.color}/>
        <BarChart height={data.two} color={config.two.color}/>
        <BarChart height={data.three} color={config.three.color}/>
        <BarChart height={data.four} color={config.four.color}/>
      </MainContainer>
    </BarContainer>
    <div className="sample-options">
       <Selector index={0} select={setItem}></Selector>
       <Selector index={1} select={setItem}></Selector>
       <Selector index={2} select={setItem}></Selector>
       <Selector index={3} select={setItem}></Selector>
    </div>
    </>
  );
}
