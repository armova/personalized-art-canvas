import React, { Component } from 'react'
import paper from 'paper'

export default class Canvas extends Component {

  componentDidMount() {
    paper.install(window);
    // Instantiate the paperScope with the canvas element
    const myCanvas = document.getElementById('myCanvas');
    myCanvas.width  = 500;
    myCanvas.height = 500;
    paper.setup(myCanvas);

    const raster = new Raster({
      source: 'https://s3-us-west-2.amazonaws.com/miarte/cuadro16.jpg',
      position: view.center,
      size: new Size(300, 417)
      //79.2 110.2 1.39
    })
  }

  render() {
    return (
      <canvas id="myCanvas" data-paper-resize />
    )
  }

}
