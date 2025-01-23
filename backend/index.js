const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { convertGraphQLToJSON } = require('./utils/graphqlToJSON');
const { convertJSONToGraphQL } = require('./utils/jsonToGraphQL');

const app = express();
const PORT = 4000;

// Allow cross-origin requests
app.use(cors());
app.use(express.json());

// GraphQL schema definition
const schema = buildSchema(`
  type Query {
    hello: String
    greet(name: String!): String
  }

  type Mutation {
    updateUser(name: String!, email: String!): String
  }
`);

// GraphQL resolvers
const root = {
  hello: () => 'Hello, World!',
  greet: ({ name }) => `Hello, ${name}!`,
  updateUser: ({ name, email }) => `Updated ${name} with email ${email}`,
};

// Introspection route
app.get('/schema', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: false,
}));

// Conversion routes
app.post('/graphql-to-json', (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Missing GraphQL query.' });

    const json = convertGraphQLToJSON(query);
    res.json({ json });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/json-to-graphql', (req, res) => {
  try {
    const { json } = req.body;
    if (!json) return res.status(400).json({ error: 'Missing JSON input.' });

    const query = convertJSONToGraphQL(json);
    res.json({ query });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
  console.log(`Schema Introspection: http://localhost:${PORT}/schema`);
});
