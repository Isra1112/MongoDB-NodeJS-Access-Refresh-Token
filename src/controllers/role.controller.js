const addNewRole = async(req,res,service)=>{
    try {
        const body = req.body;
        const role = await service.addRole(body)
        res.send(role)
    } catch (e) {
        res.sendStatus(500);
    }
}

const getRole = async(req,res,service)=>{
    try {
        let role;
        if(req.params.id){
            role = await service.findByID(req.params.id)
        }
        else if(req.query.name || req.query.default || req.query.page || req.query.limit){
            role = await service.searchQuery(req.query)
        }
        else{
            role = await service.findAllRole()
        }
        res.send(role)
    } catch (e) {
        res.sendStatus(500)
    }
}

const updateRole = async(req,res,service)=>{
    try {
        const body = req.body;
        const role = await service.editRole(body)
        res.send(role)
    } catch (e) {
        res.sendStatus(500);
    }
}

const removeRole = async(req,res,service)=>{
    try {
        const body = req.body;
        const role = await service.deleteRole(body)
        res.send(role)
    } catch (e) {
        res.sendStatus(500);
    }
}



module.exports = {addNewRole,getRole,updateRole,removeRole};