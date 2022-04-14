const Role = require('../models/role.model')
const sequelize = require('sequelize')

class RoleServ{
    async addRole(body){
        let result ;
        try {
            result = await Role.create(body);
        } catch (e) {
            throw new Error(e);
        }
        return result;
    }
    async updateRole(body,role){
        let result;
        try {
            result = await Role.update({role:body},{where:{role:role}})
        } catch (e) {
            throw new Error(e);
        }
        return result;
    }
    async deleteRole(body){
        let result;
        try {
            result = await Role.destroy({where:{role:body.role}})
        } catch (e) {
            throw new Error(e);
        }
        return result;
    }

    async getAllRole(){
        let result;
        try {
            result = await Role.findAll()
        } catch (e) {
            throw new Error(e);
        }
        return result
    }
}

module.exports = RoleServ;