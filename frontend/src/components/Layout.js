import {React, useState} from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import SlideList from './SlideList'
const Wrapper = styled.div`
  // @media (max-width: 1024px) {
  //   width: 960px;
  // }
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const Layout = ({children}) => {
  const [selectedTab, setSelectedTab] = useState('뉴스')
  return (
    <Wrapper>
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <SlideList/>
      
      {children}
    </Wrapper>
  )
}
export default Layout
