import {React, useState, useEffect, useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Slide from './Slide'
import slideImg1 from '../assets/worldchart.png'
import slideImg2 from '../assets/nct.jpg'
import slideImg3 from '../assets/babymonster.jpg'

const Wrapper = styled.div`
  width: 100%;
  height: 30vh;
  overflow: hidden;
  margin: 14px 0 10px 0;
`
const SliderWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const SlideList = () => {

  const datas= [
    { id: 1, img: slideImg1, title: '마크, 정규 1집 ‘The Firstfruit’로 한터 국가별 차트 日 부문 정상', date: '2025-04-17 22:00:00 (UTC)', link: 'https://hanteonews.com/ko/article/chart?fc=78266' },
    { id: 2, img: slideImg2, title: 'NCT 도영, 6월 솔로 컴백.. 단독 콘서트 개최', date: '2025-04-18 09:47:23 (UTC)', link: 'https://hanteonews.com/ko/article/music?fc=78300' },
    { id: 3, img: slideImg3, title: '베이비몬스터, 日 ‘서머소닉’ 2년 연속 출격.. 열도 흔든다', date: '2025-04-18 00:54:04 (UTC)', link: 'https://hanteonews.com/ko/article/music?fc=78293'}
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
  
  const [slideWrapperWidth, setSlideWrapperWidth] = useState(0); // slideWrapper의 너비
  const [slideWidth, setSlideWidth] = useState(0);  // slide너비

  useEffect(() => {
    const getSlideWidth = () => {
      if (itemRef.current) {
        setSlideWidth(itemRef.current.clientWidth);
      }
      if (ref.current) {
        setSlideWrapperWidth(ref.current.clientWidth);
      }
    };
  
    getSlideWidth();
    window.addEventListener('resize', getSlideWidth);
    return () => window.removeEventListener('resize', getSlideWidth);
  }, []);

  // 중앙 정렬을 위한 계산 
  const offset = (slideWrapperWidth - slideWidth) / 2;

  // 스크롤 시작 X좌표 저장
  const handleTouchStart = (event) => {
    event.preventDefault();
    event.touches ? setStartX(event.touches[0].clientX) : setStartX(event.clientX)
    setIsDragging(true)
  };

  // 스크롤 중 슬라이더의 이동거리 계산
  const handleTouchMove = (event) => {
    if (!isDragging) return
    event.preventDefault();
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
          transform: `translateX(${(-currentIndex * (slideWidth + 10) + moveX + offset)}px)`,
          transition: isDragging ? 'none' : transition
        }}>
        {slideList.map((data, index) => (
          <Slide 
            key={data.id}
            title={data.title}
            date={data.date}
            src={data.img}
            link={data.link}
            isDragging={isDragging}
            ref={index === 0 ? itemRef : null}/>
        ))}
      </SliderWrapper>
    </Wrapper>
  )
}

export default SlideList;


