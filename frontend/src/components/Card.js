import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.div`
  width: 100%;
  min-height: 52px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1) , 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  position: relative;
`
const Title = styled.span`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-word;
`
const Content = styled.span`
  width:100%;
  font-size: 1rem;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
   display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
`
const ButtonWrapper = styled.div`
   align-self: flex-end;
   margin-top: 10px;
`

const Card = ({title, content, link}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <ButtonWrapper>
        <Button onClick={() => window.open(link)}/>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Card
