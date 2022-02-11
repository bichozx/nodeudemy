const { Router } = require('express');

const router = Router();



router.get('/', (req, res) => {
    res.json({
        msg: 'get APi'
    });
});

router.put('/', (req, res) => {
    res.json({
        msg: 'get APi'
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: 'get APi'
    });
});

router.delete('/', (req, res) => {
    res.json({
        msg: 'get APi'
    });
});
















module.exports = router;