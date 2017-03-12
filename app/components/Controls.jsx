import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap/lib/'

const Controls = (props) => (
  <ButtonGroup justified>
    <Button href="#" disabled={false} onClick={() => props.rasterToBalls()}>First Hit Here To Digitalize </Button>
    <Button href="#" disabled={!props.displayButtons} onClick={() => props.initializePath()}>Click To Try A S D W Magic Keys</Button>
    <Button href="#" disabled={!props.displayButtons} onClick={() => props.initializeAnimation()}>Tree to birds!</Button>
    <Button href="#" disabled={!props.displayButtons} onClick={() => props.who()}>Who's Watching?</Button>
  </ButtonGroup>
)

export default Controls
