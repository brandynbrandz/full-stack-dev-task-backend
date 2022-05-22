import express from  'express';
import { graphqlHTTP } from 'express-graphql';
import { SERVER_PORT } from './variables';
import schema from "./schema";
import bodyParser from 'body-parser';
import cors from "cors"

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

try{
    app.listen(SERVER_PORT,()=> console.log(`Running a GraphQL API server at ${SERVER_PORT}`));
} catch(err) {
    console.log(`something went wrong ${err}`)
}
