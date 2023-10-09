const {ApolloServer, gql} = require('apollo-server');
const EmployeeService =require('./dataSources/file')

const typeDefs = gql`
type Query{
    employees(
        id:ID,
    firstName:String,
    lastName:String,
    designation:String,
    department: String,
    nearestCity: String
    ): [Employee]

    findEmployeeById(id:ID):Employee
    }

type Employee{
    id:ID!,
    firstName:String,
    lastName:String,
    designation:String,
    department: String,
    nearestCity: String
}

`
const resolvers = {
    Query: {
        employees:(parent, args, {dataSources}, into)=>{
            return dataSources.employeesService.getEmployee(args)
        },
        findEmployeeById(parent, {id}, {dataSources}, into){
            return dataSources.employeesService.getEmployeeById(id)[0]
        }
        
    }
}

const dataSources=()=>({
     employeesService: new EmployeeService()
})


const gqlServer = new ApolloServer({typeDefs, resolvers, dataSources});

gqlServer.listen({port:process.env.port||4000})
.then(({url})=>console.log(`server started on ${url}`))