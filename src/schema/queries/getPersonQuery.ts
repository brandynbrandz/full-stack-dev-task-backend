import { GraphQLString, GraphQLInt } from "graphql";
import { SWAPI_URL } from "../../../variables";
import PeopleGQLType from "../../typeDefs/peopleType";
import fetch from "node-fetch";

const getPersonQuery = {
  type: PeopleGQLType,
  description: "Single and Searched Star Wars Character",
  args: {
    searchName: {
      type: GraphQLString,
    },
    pageNumber: {
      type: GraphQLInt,
    },
  },
  resolve: (root: void, args: any) =>
    fetch(
      `${SWAPI_URL}/people/?search=${args.searchName}&page=${args.pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => data),
};

export default getPersonQuery;
