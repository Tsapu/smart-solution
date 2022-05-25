import {
  MakeBar,
  BarChartContainer,
} from "./styles";

import React from 'react'


export default function BarChart({height, color}) {


	
	return (
		<BarChartContainer>
        <MakeBar height={height} color={color} />
    </BarChartContainer>
	)
}
