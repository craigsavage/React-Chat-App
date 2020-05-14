const express = require('express');
const router  = express.Router();

router.route('/').get((req, res) => {
    res.send('Server is running!')
})

module.exports = router;