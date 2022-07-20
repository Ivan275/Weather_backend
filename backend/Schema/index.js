const graphql = require("graphql");
const jwt = require("jsonwebtoken");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
  } = graphql;

const userData = require("../MOCK_DATA.json");
const UserType = require("./Types/UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

  const getToken = ({ id, email }) =>
  jwt.sign(
    {
      id,
      email
    },
    "jwtPrivateKey",
    { expiresIn: '1d' }
  );

  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: UserType,
        args: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve(parent, args) {
          userData.push({
            id: userData.length + 1,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
          });
          return args;
        },
      },
      verifyUser: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          token: { type: GraphQLString },
        },
        resolve(parent, args) {

          const match = userData.find(el => {
            if(el.email === args.email && el.password === args.password) return el;
          });
          if(match) {
            const token = getToken({id: match.id, email: match.email}); 
            match.token = token;
            return match;
          }
          return;
        },
      },
    },
  });

  module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });