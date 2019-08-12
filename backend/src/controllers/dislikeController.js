const dev = require('../models/dev')

module.exports = {
    async store(request, response){

        const { user }  = request.headers;
        const { devId } = request.params;

        const loggedDev = await dev.findById(user);
        const targedDev = await dev.findById(devId);

        if(!targedDev) {
            return response.status(400).json({error: 'Dev doesnt exist!'});
        }

        loggedDev.dislikes.push(targedDev._id);

        await loggedDev.save();

        return response.json(loggedDev);
    }
};