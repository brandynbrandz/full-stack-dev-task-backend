// FROM SWAPI API DOCS https://github.com/graphql/swapi-graphql/blob/master/src/schema/types/person.js

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";
import fetch from "node-fetch";
import { SWAPI_URL } from "./variables";

const PersonType = new GraphQLObjectType({
  name: "Person",
  description:
    "An individual person or character within the Star Wars universe.",
  fields: () => ({
    name: {
      type: GraphQLString,
      description: "The name of this person",
      resolve: (person) => person.name,
    },
    gender: {
      type: GraphQLString,
      description:
        'The gender of this person. Either "Male", "Female" or "unknown","n/a" if the person does not have a gender.',
      resolve: (person) => person.gender,
    },
    mass: {
      type: GraphQLString,
      description: "The mass of the person in kilograms.",
      resolve: (person) => person.mass,
    },
    height: {
      type: GraphQLString,
      description: "The height of the person in centimeters.",
      resolve: (person) => person.height,
    },

    homeworld: {
      type: GraphQLString,
      description: "A planet that this person was born on or inhabits.",
      resolve: (person) =>
        fetch(person.homeworld)
          .then((response) => response.json())
          .then((data) => data.name),
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query of all",
  fields: () => ({
    People: {
      type: new GraphQLList(PersonType),
      description: "Star Wars Characters",
      args: {
        pageNumber: {
          type: GraphQLInt,
        },
      },
      resolve: (root, args) =>
        fetch(
          args.pageNumber
            ? `${SWAPI_URL}/people/?page=${args.pageNumber}`
            : `${SWAPI_URL}/people`
        )
          .then((response) => response.json())
          .then((data) => data.results),
    },
    Person: {
      type: PersonType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) =>
        fetch(`${SWAPI_URL}/people/${args.id}`)
          .then((response) => response.json())
          .then((data) => data),
    },
    SearchPersonByName: {
      type: new GraphQLList(PersonType),
      args: {
        searchName: {
          type: GraphQLString,
        },
        pageNumber: {
          type: GraphQLInt,
        },
      },
      resolve: (root, args) =>
        fetch(
          `${SWAPI_URL}/people/?search=${args.searchName}&page=${args.pageNumber}`
        )
          .then((response) => response.json())
          .then((data) => data.results),
    },
    GetAllPeopleCount: {
      type: GraphQLInt,
      description: "Count of Star Wars Characters",
      resolve: (root, args) =>
        fetch(`${SWAPI_URL}/people`)
          .then((response) => response.json())
          .then((data) => data.count),
    },
    GetSearchedPeopleCount: {
      type: GraphQLInt,
      args: {
        searchName: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) =>
        fetch(`${SWAPI_URL}/people/?search=${args.searchName}`)
          .then((response) => response.json())
          .then((data) => data.count),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
