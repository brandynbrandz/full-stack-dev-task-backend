import { GraphQLSchema } from "graphql";
import QueryType from "./queries";

export default new GraphQLSchema({
    query: QueryType,
  });
  