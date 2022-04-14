const addNewUser = async(req,res,service)=>{
    try {
        const body = req.body;
        const user = await service.addUser(body)
        res.send(user)
    } catch (e) {
        res.sendStatus(500);
    }
}

const getUser = async(req,res,service)=>{
    try {
        let user;
        if(req.params.id){
            user = await service.findByID(req.params.id)
        }
        else if(req.query.name || req.query.email || req.query.page || req.query.limit){
            user = await service.searchQuery(req.query)
        }
        else{
            user = await service.findAllUser()
        }
        res.send(user)
    } catch (e) {
        res.sendStatus(500)
    }
}

const updateUser = async(req,res,service)=>{
    try {
        const body = req.body;
        const user = await service.editUser(body)
        res.send(user)
    } catch (e) {
        res.sendStatus(500);
    }
}

const removeUser = async(req,res,service)=>{
    try {
        const body = req.body;
        const user = await service.deleteUser(body)
        res.send(user)
    } catch (e) {
        res.sendStatus(500);
    }
}


module.exports = {addNewUser,getUser,updateUser,removeUser};