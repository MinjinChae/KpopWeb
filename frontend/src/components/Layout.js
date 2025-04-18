import {React, useState} from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
const Wrapper = styled.div`
  // @media (max-width: 1024px) {
  //   width: 960px;
  // }
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
  // align-items: center;
  // width: 100%;
  min-height: 100vh;
`
const Layout = ({children}) => {
  const [selectedTab, setSelectedTab] = useState('차트')
  return (
    <Wrapper>
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {children}
    </Wrapper>
  )
}
export default Layout
