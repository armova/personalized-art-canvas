import React, { Component } from 'react'
import { paper, tool } from 'paper/dist/paper-full'
import socket from '../socket'
//SETS PAPER.JS TO WINDOW, HAS IMPORTANT IMPLICATIONS
// CAN BE DONE IN OTHER WAYS TOO
paper.install(window)
import Controls from './Controls'

export default class Canvas extends Component {

  //SETS STATE, SETS SOCKET.IO TO FUNCTION, BINDS FUNCTIONS
  constructor (props) {
    super(props)
    this.state = {
      mainRaster: undefined,
      demoPath1: undefined,
      demoPath1Position: undefined,
      AnimatedSymbols: undefined,
      eyes: undefined,
      IMGrasterized: false,
    }
    socket.on('newData', (data) => this.initializeAnimation(data))
    this.loadRaster = this.loadRaster.bind(this)
    this.rasterToBalls = this.rasterToBalls.bind(this)
    this.keyDownFunc = this.keyDownFunc.bind(this)
    this.initializePath = this.initializePath.bind(this)
    this.initializeAnimation = this.initializeAnimation.bind(this)
    this.onFrameFunc = this.onFrameFunc.bind(this)
    this.who = this.who.bind(this)
  }

  // SETS CANVAS SIZE, SETSUP PAPER.JS, LOADS IMAGE, SETS VIEW EVENTS TO COMPONENTS FUNCTIONS
  componentDidMount () {
    const myCanvas = document.getElementById('myCanvas');
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight*0.95;
    paper.setup(myCanvas);
    this.loadRaster()
    view.onKeyDown = this.keyDownFunc
    view.onFrame = this.onFrameFunc
  }

  //ADDS SOME CIRCLES (WATCHING CIA EYES) TO THE CANVAS
  who () {
    if(!this.state.eyes){
      var myStyle1 = {
        strokeColor: '#93edf2',
        fillColor: '#000000',
        strokeWidth: 40
      };

      var myCircle1 = new Path.Circle({
        center: [825, 300],
        radius: 60
      });

      var myCircle2 = new Path.Circle({
        center: [675, 300],
        radius: 60
      });

      myCircle1.style = myStyle1
      myCircle2.style = myStyle1

      var myStyle2 = {
        strokeColor: '#f9f59d',
        fillColor: '#000000',
        strokeWidth: 50
      };

      var myCircle3 = new Path.Circle({
        center: [400, 100],
        radius: 50
      });

      var myCircle4 = new Path.Circle({
        center: [275, 100],
        radius: 50
      });

      myCircle3.style = myStyle2
      myCircle4.style = myStyle2

      this.setState({eyes: [myCircle1, myCircle2, myCircle3, myCircle4]})
    } else{
      this.state.eyes.forEach(eye => {
        eye.remove()
      })
      this.setState({eyes: undefined})
    }
  }

  //SETS THE QTY OF SYMBOLS TO ANIMATE ACCORIDNG TO THE BALLS CREATED WHEN CHANGING IMAGE TO BALLS - 3500
  initializeAnimation () {
    // The amount of circles we want to make:
    if((this.state.AnimatedSymbols === undefined)&&(this.state.IMGrasterized)){
      this.setState({AnimatedSymbols: 3500})
    } else {
      this.setState({AnimatedSymbols: undefined})
    }
  }

  // ONE EACH FRAME CHANGES THE ANIMATES ELEMENTS POSITION
  onFrameFunc (event) {
    // Run through the active layer's children list and change
    // the position of the placed symbols:
    const count = this.state.AnimatedSymbols
    if(count){
        // Run through the active layer's children list and change
      // the position of the placed symbols:
      for (var i = 0; i < count; i++) {
        var item = project.activeLayer.children[i];

        // Move the item 1/20th of its width to the right. This way
        // larger circles move faster than smaller circles:
        item.position.x += Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1))) + Math.ceil(1);

        // If the item has left the view on the right, move it back
        // to the left:
        if (item.bounds.left > view.size.width) {
          item.position.x = -item.bounds.width;
        }
      }
    }
  }

  //INITIALIZE A PATH TO BE ABLE TO DRAW WITH A S D W KEYS
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

  //DRAW WITH A S D W KEYS
  keyDownFunc (event) {
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

  /// IMAGE
  loadRaster () {
    let raster = new Raster('art')
    raster.size = new Size(396, 551)
    //1.3914

    this.setState({mainRaster: raster})

    project.activeLayer.position = view.center;
  }

  //DIGITALIZE IMAGE TO BALLS
  rasterToBalls() {
    if(!this.state.IMGrasterized){
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
      this.setState({IMGrasterized: true})
    }
  }

  render() {
    return (
      <div>
        <canvas id="myCanvas" data-paper-resize />
        <Controls rasterToBalls={this.rasterToBalls} initializePath={this.initializePath} initializeAnimation={this.initializeAnimation} who={this.who} displayButtons={this.state.IMGrasterized}/>
      </div>
    )
  }
}


