import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import PersonGQLType from "./personType";

const PeopleGQLType = new GraphQLObjectType({
  name: "People",
  fields: () => ({
    count: {
      type: GraphQLInt,
    },
    next: {
      type: GraphQLString,
    },
    previous: {
      type: GraphQLString,
    },
    results: {
      type: new GraphQLList(PersonGQLType),
    },
  }),
});

export default PeopleGQLType;
