import { GraphQLObjectType, GraphQLString } from "graphql";
import fetch from "node-fetch";
const PersonGQLType = new GraphQLObjectType({
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

export default PersonGQLType;
