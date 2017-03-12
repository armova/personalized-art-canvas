'use strict'; // eslint-disable-line semi

require('APP/db')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .get('/remote', function(req, res){
    const st = require('./start')
    const io = st.io
    io.emit('newData', 1)
    res.send('OK')
  })
  .use('/users', require('./users'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
