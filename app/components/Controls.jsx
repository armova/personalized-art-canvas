import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap/lib/'

const Controls = (props) => (
  <ButtonGroup justified>
    <Button href="#" onClick={() => props.rasterToBalls()}>Image Digitalizer</Button>
    <Button href="#" onClick={() => props.initializePath()}>Try A S D W Magic Keys</Button>
    <Button href="#" onClick={() => props.initializeAnimation()}>Tree to birds!</Button>
    <Button href="#" onClick={() => props.who()}>Who's Watching?</Button>
  </ButtonGroup>
)

export default Controls
