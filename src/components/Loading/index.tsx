import React from 'react'

import Loader from 'react-loader-spinner'

import { Container } from './styles'

interface LoadingProps{  
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return(
    <Container>
      <Loader
        type='Oval'
        color="#4d6f80"
        width={65}
        height={65}
      />
      <p>{text}</p>
    </Container>
  )
}

export default Loading