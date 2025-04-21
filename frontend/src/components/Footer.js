import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray};
  width: 100%;
  height: auto;
  padding: 14px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
`

const Footer = () => {
  return (
    <Wrapper>
      <p>© 2025 Minjin Chae. All rights reserved.</p>
    </Wrapper>
  )
}

export default Footer
