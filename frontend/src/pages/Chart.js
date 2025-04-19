import {React, useState} from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SlideList from '../components/SlideList'

const SlideWrapper = styled.div`
  display: flex;
  jusfiy-content: center;
  // padding: 0 16px;
`
const Chart = () => {

  return (
    <div>
      <SlideWrapper>
        <SlideList/>
      </SlideWrapper>
    </div>
  )
}

export default Chart