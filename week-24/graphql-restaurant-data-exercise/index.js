const { graphqlHTTP } = require('express-graphql');
const { buildSchema, assertInputType } = require('graphql');
const express = require('express');
const { delimiter } = require('path');

// Construct a schema, using GraphQL schema language
const restaurants = [
  {
    id: 1,
    name: 'WoodsHill ',
    description:
      'American cuisine, farm to table, with fresh produce every day',
    dishes: [
      {
        name: 'Swordfish grill',
        price: 27,
      },
      {
        name: 'Roasted Broccily ',
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: 'Fiorellas',
    description:
      'Italian-American home cooked food with fresh pasta and sauces',
    dishes: [
      {
        name: 'Flatbread',
        price: 14,
      },
      {
        name: 'Carbonara',
        price: 18,
      },
      {
        name: 'Spaghetti',
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: 'Karma',
    description:
      'Malaysian-Chinese-Japanese fusion, with great bar and bartenders',
    dishes: [
      {
        name: 'Dragon Roll',
        price: 12,
      },
      {
        name: 'Pancake roll ',
        price: 11,
      },
      {
        name: 'Cod cakes',
        price: 13,
      },
    ],
  },
];
const schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  name: String
  description: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setrestaurant(input: restaurantInput): restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, name: String!): restaurant
}
`);
// The root provides a resolver function for each API endpoint

const root = {
  restaurant: (args) =>
    restaurants.find((restaurant) => restaurant.id === args.id),
  restaurants: () => restaurants,
  setrestaurant: ({ input }) => {
    const restaurant = { ...input, id: restaurants.length + 1 };
    restaurants.push(restaurant);
    return restaurant;
  },
  deleterestaurant: ({ id }) => {
    let ok = false;
    const delIndex = restaurants.findIndex(
      (restaurant) => restaurant.id === id
    );
    if (delIndex >= 0) {
      restaurants.splice(delIndex, 1);
      ok = true;
    }
    return { ok };
  },
  editrestaurant: ({ id, ...restaurant }) => {
    const edIndex = restaurants.findIndex((element) => element.id === id);
    if (edIndex >= 0) {
      const target = restaurants.splice(edIndex, 1)[0];
      const newRestaurant = { ...target, ...restaurant };
      restaurants.push(newRestaurant);
      return newRestaurant;
    }
  },
};
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
const PORT = 5500;
app.listen(5500, () =>
  console.log(`Running Graphql on http://localhost:${PORT}/graphql`)
);

// export default root;
