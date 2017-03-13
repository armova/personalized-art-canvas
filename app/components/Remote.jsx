import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap/lib/'
import socket from '../socket'
import axios from 'axios'

const handle = (event) => {
  //socket.emit('control-data', 1)
  axios.get('/api/remote')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

const wellStyles = {
  maxWidth: 400,
  height: 500,
  margin: '0 auto 10px'};

const remote1 = {
  height: 400
}

const Remote = (props) => (
  <div className="well" style={wellStyles}>
    <Button style={remote1} bsStyle="primary" bsSize="large" block onClick={() => handle()}>REMOTE TREE TO BIRDS</Button>
  </div>
)

//

export default Remote
