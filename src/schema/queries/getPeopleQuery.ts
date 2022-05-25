import {
  GraphQLInt,
} from "graphql";
import { SWAPI_URL } from "../../../variables";
import PeopleGQLType from "../../typeDefs/peopleType";
import fetch from "node-fetch";

const getPeopleQuery = {
  type: PeopleGQLType,
  description: "Star Wars Characters",
  args: {
    pageNumber: {
      type: GraphQLInt,
    },
  },
  resolve: (root: void, args: any) => 
    fetch(
      args.pageNumber
        ? `${SWAPI_URL}/people/?page=${args.pageNumber}`
        : `${SWAPI_URL}/people`
    )
      .then((response) => response.json())
      .then((data) => data)
};

export default getPeopleQuery