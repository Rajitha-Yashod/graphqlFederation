const {ApolloServer, gql} = require('apollo-server');

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

const gqlServer = new ApolloServer({typeDefs});

gqlServer.listen({port:process.env.port||4000})
.then(({url})=>console.log(`server started on ${url}`))