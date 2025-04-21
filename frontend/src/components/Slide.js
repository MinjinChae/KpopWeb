import React, { forwardRef } from 'react'
import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 90%;
  min-height: 240px;
  height: auto;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1) , 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`
const ImgWrapper = styled.div`
  height: 150px;
  border-radius: 10px 10px 0 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 10px 10px 0 0;
  }
`
const TextWrapper = styled.div`
  margin: 14px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  `
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.span`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-word;
`
const Date = styled.span`
  font-size: 1rem;
  margin-top: 20px;
  text-align: right;
  white-space: nowrap;
`

const Slide = forwardRef(({ src, title, date, link, $isDragging }, ref) => {
  
  // 데스크탑 웹의 경우 드래그 중에는 괜찮지만 마우스 버튼을 떼는 순간 링크가 이동하는 경우가 있어 수정 필요!!
  const handleClick = () => {
    if (!$isDragging) {
      window.open(link)
      return;
    }
  }

  return <Wrapper ref={ref} >
      <ImgWrapper>
        <img src={src} alt={title}/>
      </ImgWrapper>
      <TextWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <Button onClick={handleClick}/>
        </TitleWrapper>
        <Date>{date}</Date>
      </TextWrapper>
    </Wrapper>;
});

export default Slide
