import styled, { css } from "styled-components";

export const BarContainer = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
	background-color: 
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Chart = css`
  margin-top: 10px;
  width: 90px;
  @media (max-width: 420px) {
    width: 60px;
  }
`;

export const Number = styled.span`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
	background-color: ${(props) => props.color};
  ${Chart};
`;

export const BlackLine = styled.div`
  width: 100%;
  height: 5px;
  background-color: grey;
`;
