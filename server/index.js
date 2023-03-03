const express = require('express')
const app = express()
const router = app.router()

app.listen(3001, () => {
    console.log('port on 3001!')
})