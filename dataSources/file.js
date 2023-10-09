const employees =require('../Data/employees.json')
const {DataSource}=require('apollo-datasource')
const _ = require('lodash')

class EmployeeService extends DataSource{
    constructor(){
        super();
    }

    initialize(confi){

    }

    getEmployee(args){
        return _.filter(employees,args)
    }

    getEmployeeById(id){
        return employees.filter(function(employees){
            return employees.id=id
        })
    }
}

module.exports=EmployeeService



