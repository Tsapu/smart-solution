
import ReactAudioPlayer from 'react-audio-player';
import React from 'react'

export default function GlobalAudio({volume, audio}) {

	return (
		<>
			<ReactAudioPlayer
				src={`audio/${audio[0]}.wav`}
				autoPlay
				loop
				volume={volume.one / 100}
			/>
			<ReactAudioPlayer
				src={`audio/${audio[1]}.wav`}
				autoPlay
				loop
				volume={volume.two / 100}
			/>
			<ReactAudioPlayer
				src={`audio/${audio[2]}.wav`}
				autoPlay
				loop
				volume={volume.three / 100}
			/>
			<ReactAudioPlayer
				src={`audio/${audio[3]}.wav`}
				autoPlay
				loop
				volume={volume.four / 100}
			/>
		</>
	)
}
