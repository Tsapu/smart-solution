import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function SliderSizes() {
	// on change => send out the event to server
	// Simple JSON?
	// {"one": 1-100, "two": 1-100, "three": .., "four": ..}

	const [data, setData] = useState({one: 25, two: 25, three: 25, four: 25});
	const [ws, setWs] = useState(new WebSocket("wss://adwinthief.com/publish")); //"wss://adwinthief.com/publish")); //"ws://localhost:5000/publish"

	useEffect(() => {
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

	const handlechange = name => (e, value) => {
		setData({
			...data,
			[name]: value
		})
		ws.send(JSON.stringify(data));
		console.log(data)
	}

  return (
    <Box width={300} marginTop={10}>
      <Slider
				defaultValue={25}
				aria-label="Default"
				valueLabelDisplay="auto"
				id='one'
				name='one'
				onChange={handlechange('one')}/>
			<Slider
				sx={{ mt: "1rem" }}
				defaultValue={25}
				aria-label="Default"
				valueLabelDisplay="auto"
				id='two'
				name='two'
				onChange={handlechange('two')}/>
			<Slider
				sx={{ mt: "1rem" }}
				defaultValue={25}
				aria-label="Default"
				valueLabelDisplay="auto"
				id='three'
				name='three'
				onChange={handlechange('three')}/>
			<Slider
				sx={{ mt: "1rem" }}
				defaultValue={25}
				aria-label="Default"
				valueLabelDisplay="auto"
				id='four'
				name='four'
				onChange={handlechange('four')}/>
    </Box>
  );
}