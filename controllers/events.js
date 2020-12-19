const { response } = require('express');
const Event = require('../models/Event');



const getEvents = async ( req, res = response ) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })

};


const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        event.done = false;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the manager',
        })
    }

};


const updateEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exists by that id"
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "Can't edit an event from another user"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: eventUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the manager',
        })
    }

};


const deleteEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exists by that id"
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "Can't delete an event from another user"
            })
        }

        await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the manager',
        })
    }

};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}