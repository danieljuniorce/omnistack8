const Dev = require('./../models/Dev');

module.exports = {
    async store(req, res) {

        const { id } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(id);

        if (!targetDev) {
            res.status(400).json({ error: 'Dev not exists!' });
        }
/*
        if (loggedDev.likes.includes(targetDev._id)) {
            console.log('DEU MATCH');
        }

        loggedDev.likes.push(targetDev._id);
*/
        await loggedDev.save();

        return res.json(loggedDev);
    }
}