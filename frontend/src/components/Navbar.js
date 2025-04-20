import {React, useState, useEffect, useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'


const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.bgPink};
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 16px 30px;
  // gap: 30px;
`
const TabGroup = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  gap: 30px;
  transition-duration: 700ms;
  // transition-timing-function: ease-out; // 점점 느려짐
`
const Tab = styled.li`
  white-space: nowrap;
  list-style: none;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.white : theme.colors.black)};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
`
// const Link = styled.link`

// `
const Navbar = ({selectedTab, setSelectedTab}) => {
  const [startX, setStartX] = useState(0) // 첫 터치 시작 위치
  const [moveX, setMoveX] = useState(0) // 스크롤한 거리
  const [prevX, setPrevX] = useState(0) // 이전 이동 거리

  const ref = useRef(null) // DOM element에 직접 접근하기 위해 ref 사용
  
  const [isDragging, setIsDragging] = useState(false) // 드래그 여부 

  const tabs = [
    {name: '뉴스', path: '/'},
    {name: '차트', path: '/chart'},
    {name: 'Whook', path: '/whook'},
    {name: '이벤트', path: '/event'},
    {name: '스토어', path: '/store'},
    {name: '충전소', path: '/charge'},
  ]
  // 스크롤 시작 X좌표 저장
  const handleTouchStart = (event) => {
    // event.preventDefault(); // 기본 동작 및 touch event와의 충돌 방지 
    event.touches ? setStartX(event.touches[0].clientX) : setStartX(event.clientX)
    setIsDragging(true)
    // setStartX(event.touches[0].clientX)
    // console.log('startX:', startX)
  };

  // 스크롤 중 슬라이더의 이동거리 계산
  const handleTouchMove = (event) => {
    if (!isDragging) return
    // event.preventDefault(); // 기본 동작 및 touch event와의 충돌 방지
    const currentX = event.touches ? event.touches[0].clientX : event.clientX
    const distanceX = currentX - startX + prevX // 이동 거리 = 스크롤 한 위치 - 시작 위치 + 이전 이동 거리
    const maxScroll = ref.current.scrollWidth - ref.current.clientWidth // 최대 스크롤 가능 거리 
    // console.log("scrollWidth:", ref.current.scrollWidth); // 확인용
    // console.log("clientWidth:", ref.current.clientWidth); // 확인용

    // distance의 값은 오른쪽으로 스크롤하면 양수, 왼쪽으로 스크롤하면 음수
    let newMoveX // setMoveX가 비동기로 이루어져 moveX를 즉시 반영 못하는 문제가 발생하는 것을 방지
    if (distanceX > 0) {
      newMoveX = 0
      setMoveX(0); // 첫 슬라이드에서 더 이동하지 않음
    } else if (Math.abs(distanceX) > maxScroll) {
      newMoveX = -maxScroll
      setMoveX(-maxScroll); // 마지막 슬라이드에서 더 이동하지 않음
    } else {
      newMoveX = distanceX
      setMoveX(distanceX); // 계산된 이동 거리를 상태변수에 담아두기
    }
    // console.log('moveX:', moveX)
    // console.log(maxScroll,distanceX)

    ref.current.style.transform = `translateX(${newMoveX}px)`;  // 스크롤한 거리만큼 이동

  };

  // 스크롤이 끝나며 이동 거리를 이전 이동 거리 변수로 저장, 다음 이동 거리 계산 시 사용
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setPrevX(moveX)
    setIsDragging(false)
    // console.log('prevX:', prevX)
  }

  const navigate = useNavigate();
  const location = useLocation();

  // 새로고침 시, 네비게이션 위치가 앞으로 돌아가는 것을 방지하기 위한 함수가 필요함!(추후 개발 예정)
  // 새로고침 시, 초기값인 chart 페이지로 돌아가는 것을 방지하기 위해 현재 위치한 URL에 맞는 탭을 설정
  useEffect(() => {
    console.log(location)
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setSelectedTab(currentTab.name); 
    }
  }, [location.pathname, setSelectedTab]); 
  
  const handleSelect = (tab) => {
    // setSelectedTab(tab.name)
    navigate(tab.path)
  }

  return (
    <Header>
      <TabGroup
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart} // 마우스 버튼이 눌려지는 순간
        onMouseMove={handleTouchMove} // 커서가 움직이는 순간
        onMouseUp={handleTouchEnd} // 마우스 버튼이 떼지는 순간 
        onMouseLeave={handleTouchEnd} // 마우스가 벗어나는 순간
        isDragging={isDragging}>
        {tabs.map((tab)=>(
            <Tab 
              key={tab.name}
              isActive={selectedTab === tab.name}
              onClick={()=>handleSelect(tab)}>
              {tab.name}
            </Tab>
          ))}
      </TabGroup>
    </Header>
  )
}
export default Navbar
