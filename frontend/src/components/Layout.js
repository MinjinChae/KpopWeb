import {React, useState} from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import SlideList from './SlideList'
import Footer from './Footer'
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

const Content = styled.main`
  flex: 1;
`

const Layout = ({children}) => {
  const [selectedTab, setSelectedTab] = useState('뉴스')
  return (
    <Wrapper>
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <Content>
        <SlideList />
        {children}
      </Content>
      <Footer/>
    </Wrapper>
  )
}
export default Layout
