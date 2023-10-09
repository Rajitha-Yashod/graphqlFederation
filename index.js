const {ApolloServer, gql} = require('apollo-server');
const empoyees=require('./Data/employees')

const typeDefs = gql`
type Query{
    empoyees: [Employee]
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
        empoyees:()=>{
            return empoyees
        }
    }
}


const gqlServer = new ApolloServer({typeDefs, resolvers});

gqlServer.listen({port:process.env.port||4000})
.then(({url})=>console.log(`server started on ${url}`))