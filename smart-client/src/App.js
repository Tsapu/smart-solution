import './App.css';
import Slider from "./slider.js";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const sendSound = () => {
  fetch('https://adwinthief.com/laser', { //localhost:5000
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({laser: 1})
}).then(res => res.json())
  .then(res => console.log("GOT LASER"));
}

export default function App() {
  return (
    <>
      <button onClick={sendSound}>LASER</button>
      <Stack spacing={2} alignItems="center">
        <Slider/> 
      </Stack>
    </>
  );
}
