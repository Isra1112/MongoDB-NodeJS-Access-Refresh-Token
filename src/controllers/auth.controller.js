const reqRefreshToken = async (req, res, service) => {
    try {
        await service.signin(req,res);
        // if (userInfo) {
        //     res.status(200);
        //     res.send(userInfo);
        // } else {
        //     res.status(401);
        //     res.json({
        //         message: "Unauthorized"
        //     })
        // }
    } catch (e) {
        res.status(500);
            res.json(e.message)
    }
};

const reqAccessToken = async (req, res, service) => {
    try {
        await service.accessToken(req,res);
        // if (userInfo) {
        //     res.status(200);
        //     res.send(userInfo);
        // } else {
        //     res.status(401);
        //     res.json({
        //         message: "Unauthorized"
        //     })
        // }
    } catch (e) {
        res.status(500);
            res.json(e.message)
    }
};

module.exports = { reqRefreshToken,reqAccessToken };