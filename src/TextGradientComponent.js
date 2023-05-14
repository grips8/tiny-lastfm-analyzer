import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

/**
 * Example Text Gradient Animation
 */
export default function TextGradientComponent(text) {
    return (
        <>
            <AnimatedGradientText>{text}</AnimatedGradientText>
        </>
    );
}

const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`;
const AnimatedGradientText = styled.h1`
  color: #f35626;
  background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${hue} 5s infinite linear;
  font-family: Monospaced, Helvetica, Arial, sans-serif;
  font-feature-settings: "kern";
  font-size: 44px;
  font-weight: 700;
  line-height: 50px;
  overflow-wrap: break-word;
  text-align: end;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
`;