/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateUser } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.use( validateJWT );


router.get('/', getEvents);

router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('date', 'Date is required').custom( isDate ),
        validateUser
    ], 
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;