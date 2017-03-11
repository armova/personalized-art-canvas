import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap/lib/';

const Controls = (props) => (
  <ButtonGroup justified>
    <Button href="#" onClick={() => props.rasterToBalls()}>Rasterizer</Button>
    <Button href="#" onClick={() => props.initializePath()}>Keys Path</Button>
    <Button href="#">Right</Button>
  </ButtonGroup>
)

export default Controls
