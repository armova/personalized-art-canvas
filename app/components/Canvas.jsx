import React, { Component } from 'react'
import paper from 'paper'
paper.install(window);

import Controls from './Controls'

export default class Canvas extends Component {

  constructor (props) {
    super(props)
    this.state = {
      mainRaster: undefined,
      demoPath1: undefined,
      demoPath1Position: undefined
    }
    this.loadRaster = this.loadRaster.bind(this)
    this.rasterToBalls = this.rasterToBalls.bind(this)
    this.keyDownFunc = this.keyDownFunc.bind(this)
    this.initializePath = this.initializePath.bind(this)
  }

  componentDidMount() {
    const myCanvas = document.getElementById('myCanvas');
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight*0.95;
    paper.setup(myCanvas);
    this.loadRaster()
    view.onKeyDown = this.keyDownFunc
  }

  keyDownFunc (event) {
    console.log(event)
    const step = 50
    const position = this.state.demoPath1Position
    if(event.key == 'a') {
      position.x -= step
    }
    if(event.key == 'd') {
      position.x += step
    }
    if(event.key == 'w') {
      position.y -= step
    }
    if(event.key == 's') {
      position.y += step
    }
    this.state.demoPath1.add(position)
    this.setState({demoPath1Position: position})
  }

  initializePath() {
    var position = new Point(20, 500);
    var path = new Path();
    path.strokeColor = '#ff9321';
    path.add(position);
    path.strokeWidth = 2.5;
    path.strokeCap = 'round';
    this.setState({demoPath1: path})
    this.setState({demoPath1Position: position})
  }


  loadRaster () {
    let raster = new Raster('art')
    raster.size = new Size(396, 551)
    //1.3914

    this.setState({mainRaster: raster})

    project.activeLayer.position = view.center;
  }

  rasterToBalls() {
    console.log(view)
    const raster = this.state.mainRaster
    //Hide the raster:
    raster.visible = false;

    // The size of our grid cells:
    var gridSize = 8;

    // Space the cells by 120%:
    var spacing = 1.2;
    raster.size = new Size(50, 70)
    for (var y = 0; y < raster.height; y++) {
      for(var x = 0; x < raster.width; x++) {
        // Get the color of the pixel:
        var color = raster.getPixel(x, y);

        // Create a circle shaped path:
        var path = new Path.Circle({
          center: new Point(gridSize*x, gridSize*y),
          radius: gridSize / 2 / spacing
        });
        // Set the fill color of the path to the color
        // of the pixel:
        path.fillColor = color;
      }
    }
    // Move the active layer to the center of the view, so all
    // the created paths in it appear centered.
    project.activeLayer.position = view.center;
  }

  render() {
    return (
      <div>
        <canvas id="myCanvas" data-paper-resize />
        <Controls rasterToBalls={this.rasterToBalls} initializePath={this.initializePath}/>
      </div>
    )
  }

}
