const addNewModule = async(req,res,service)=>{
    try {
        const body = req.body;
        const module = await service.addModule(body)
        res.send(module)
    } catch (e) {
        res.sendStatus(500);
    }
}

const getModule = async(req,res,service)=>{
    try {
        let module;
        if(req.params.id){
            module = await service.findByID(req.params.id)
        }
        else if(req.query.name || req.query.default || req.query.page || req.query.limit){
            module = await service.searchQuery(req.query)
        }
        else{
            module = await service.findAllModule()
        }
        res.send(module)
    } catch (e) {
        res.sendStatus(500)
    }
}

const updateModule = async(req,res,service)=>{
    try {
        const body = req.body;
        const module = await service.editModule(body)
        res.send(module)
    } catch (e) {
        res.sendStatus(500);
    }
}

const removeModule = async(req,res,service)=>{
    try {
        const body = req.body;
        const module = await service.deleteModule(body)
        res.send(module)
    } catch (e) {
        res.sendStatus(500);
    }
}



module.exports = {addNewModule,getModule,updateModule,removeModule};