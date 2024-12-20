const express = require("express")
const path = require("path")

const router = express.Router()

// on travaille sur les routes de chque page 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Client-export.html'))
})
module.exports = router