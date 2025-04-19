import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex-shrink: 0; 
  width: 90%;
  height: 216px;
  background-color: pink;
  border: 1px solid black;
`
const Slide = forwardRef(({ content }, ref) => {
  return <Wrapper ref={ref}>{content}</Wrapper>;
});

export default Slide
