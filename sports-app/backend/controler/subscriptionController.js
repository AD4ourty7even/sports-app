const expressAsyncHandler = require("express-async-handler");
const Subscription = require("../models/subscriptionModel");

//@desc subscribe a user
//POST /api/subscribe
//@access Private
const subscribe = expressAsyncHandler(async (req, res) => {
    const subscription = req.body;
    const newSubscription = new Subscription({
        endpoint: subscription.endpoint,
        keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
        },
    });
    // const 
    await newSubscription.save();

    res.status(201).json({ message: 'Subscription saved successfully' });
})

module.exports = {subscribe}