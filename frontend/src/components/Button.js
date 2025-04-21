import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  width: auto;
  min-width: 72px;
  height: 28px;
  padding: 4px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.pointPink};
  border-radius: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.pointPink};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Button = ({onClick}) => {
  return (
    <Wrapper type="button" onClick={onClick}>
      기사읽기
    </Wrapper>
  )
}

export default Button
