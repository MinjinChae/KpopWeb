import {React, useState, useEffect, useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Slide from './Slide'

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`
const SliderWrapper = styled.div`
  // width: 100%;
  display: flex;
  gap: 10px;
`
const SlideList = () => {

  const datas= [
    { id: 1, img:'https://buly.kr/28saU4f', content: '1' },
    { id: 2, img:'https://buly.kr/28saU4f', content: '2' },
    { id: 3, img:'https://buly.kr/28saU4f', content: '3' }
  ]

  const [startX, setStartX] = useState(0) // 첫 터치 시작 위치
  const [moveX, setMoveX] = useState(0) // 스크롤한 거리
  const [isDragging, setIsDragging] = useState(false) // 드래그 여부 
  const [currentIndex, setCurrentIndex] = useState(1)
  const [transition, setTransition] = useState('');
  const slideList = [datas[datas.length-1], ...datas, datas[0]]

  // 3 1 2 3 1 . . 

  const ref = useRef(null) // DOM element에 직접 접근하기 위해 ref 사용
  const itemRef = useRef(null) // slide 컴포넌트에 직접 접근하기 위해 ref 사용
  
  // slide너비
  const [slideWidth, setSlideWidth] = useState(0);
  useEffect(() => {
    if (itemRef.current) {
      setSlideWidth(itemRef.current.clientWidth);
    }
  }, []);

  // 스크롤 시작 X좌표 저장
  const handleTouchStart = (event) => {
    event.touches ? setStartX(event.touches[0].clientX) : setStartX(event.clientX)
    setIsDragging(true)
  };

  // 스크롤 중 슬라이더의 이동거리 계산
  const handleTouchMove = (event) => {
    if (!isDragging) return
    // event.preventDefault();
    const currentX = event.touches ? event.touches[0].clientX : event.clientX
    const distanceX = currentX - startX  // 이동 거리 = 스크롤 한 위치 - 시작 위치
    setMoveX(distanceX)
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    // 임계값을 넘겼다면 슬라이드 인덱스 변경
    if (Math.abs(moveX) > 60) {
      if (moveX > 0) {
        // 이전 슬라이드로 인덱스 변경
        setCurrentIndex((prev => prev-1));
      } else {
        // 다음 슬라이드로 인덱스 변경
        setCurrentIndex((prev => prev+1));
      }
    }
    
    setTransition('transform 0.3s ease');
    
    // drag 동작 여부 및 이동 거리 초기화
    setIsDragging(false);
    setMoveX(0)
  }

  // 3 1 2 3 1
  // 1 2 3
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setTransition('');
        setCurrentIndex(datas.length);
      }, 300); 
    } else if (currentIndex === datas.length + 1) {
      setTimeout(() => {
        setTransition('');
        setCurrentIndex(1);
      }, 300);
    }
  }, [currentIndex]);

  return (
    <Wrapper>
      <SliderWrapper
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart} // 마우스 버튼이 눌려지는 순간
        onMouseMove={handleTouchMove} // 커서가 움직이는 순간
        onMouseUp={handleTouchEnd} // 마우스 버튼이 떼지는 순간 
        onMouseLeave={handleTouchEnd} // 마우스가 벗어나는 순간
        isDragging={isDragging}
        style={{
          transform: `translateX(${(-currentIndex * slideWidth + moveX)}px)`,
          transition: isDragging ? 'none' : transition
        }}>
        {slideList.map((data, index) => (
          <Slide 
            key={data.id}
            content={data.content}
            ref={index === 0 ? itemRef : null}/>
        ))}
      </SliderWrapper>
    </Wrapper>
  )
}

export default SlideList;


