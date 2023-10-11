const {ApolloServer, gql} = require('apollo-server');
const EmployeeService =require('./dataSources/file')
const ProjectService =require('./dataSources/project')
const {RESTDataSource} = require ('apollo-datasource-rest')


const typeDefs = gql`
type Query{
    employees( id:ID, firstName:String, lastName:String, designation:String, department: String, nearestCity: String ): [Employee]

    findEmployeeById(id:ID):Employee

    projects:[Project]

    findProjectById(id:ID): Project

    }

type Employee{
    id:ID!,
    firstName:String,
    lastName:String,
    designation:String,
    department: String,
    nearestCity: String,
    projects:[Project]
}

type Project{
    id:ID!,
    projectName: String,
    startDate: String,
    client: String,
    employees: [Int]

}

`
const resolvers = {
    Query: {
        employees:(parent, args, {dataSources}, into)=>{
            return dataSources.employeesService.getEmployee(args)
        },
        findEmployeeById(parent, {id}, {dataSources}, into){
            return dataSources.employeesService.getEmployeeById(id)[0]
        },
        projects:(parent, args, {dataSources}, into)=>{
            return dataSources.projectService.getProjects()
        },
        findProjectById:(parent, {id}, {dataSources}, into)=>{
            return dataSources.projectService.findProjectById(id);
        }   
    },
    Employee:{
        async projects(employee,args,{dataSources},into){
            let projects = await dataSources.projectService.getProjects()
            let workingProjects = projects.filter((project)=>{
                return project.employees.includes(employee.id)
                
            })

         return workingProjects;
        }
    }
}

const dataSources=()=>({
     employeesService: new EmployeeService(),
     projectService: new ProjectService(),
})


const gqlServer = new ApolloServer({typeDefs, resolvers, dataSources});

gqlServer.listen({port:process.env.port||4000})
.then(({url})=>console.log(`server started on ${url}`))