import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`
const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.pointPink : theme.colors.bgGray)};
  cursor: pointer;
`

const Indicator = ({len, currentIndex, onClick}) => {
  return (
    <Wrapper>
      {Array.from({ length: len }).map((_, index) => (
        <Dot
          key={index}
          $isActive={index === currentIndex - 1}
          onClick={() => onClick(index + 1)}
        />
      ))}
    </Wrapper>

  )
}

export default Indicator
