'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

const ApolloServer = use('ApolloServer')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    type Query {
        testString: String
    }
`

const resolvers = {
    Query: {
        testString () {
            return 'Seems to be working!'
        }
    }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.route('/graphql', ({ request, response }) => {
    return ApolloServer.graphql({ schema }, request, response)
}, ['GET', 'POST'])

Route.get('/graphiql', ({ request, response }) => {
    return ApolloServer.graphiql({ endpointURL: '/graphql' }, request, response)
})
