const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema")
const cors = require("cors");


app.use(cors());
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
    console.log("Server running");
  });