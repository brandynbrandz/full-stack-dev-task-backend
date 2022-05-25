import { GraphQLObjectType, GraphQLSchema } from "graphql";

import getPeopleQuery from "./getPeopleQuery";
import getPersonQuery from "./getPersonQuery";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query of all",
  fields: {
    People: getPeopleQuery,
    Person: getPersonQuery,
  },
});

export default QueryType;
