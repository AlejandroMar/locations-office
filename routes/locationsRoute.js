const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


const locationsController = require('../controllers/locationsController');

router.get('/', async (req, res) => {
    res.send('hello');
});

router.post('/', upload.single('avatar'), locationsController.postLocation);


module.exports = router;
