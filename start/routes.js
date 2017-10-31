'use strict'

const Route = use('Route')

const ApolloServer = use('ApolloServer')
const schema = require('../app/data/schema');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.route('/graphql', ({ request, auth, response }) => {
    return ApolloServer.graphql({
      schema,
      context: { auth }
    }, request, response)
}, ['GET', 'POST'])

Route.get('/graphiql', ({ request, response }) => {
    return ApolloServer.graphiql({ endpointURL: '/graphql' }, request, response)
})
