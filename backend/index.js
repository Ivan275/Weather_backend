const express = require("express");
const app = express();
const PORT = 6969;
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

app.listen(PORT, () => {
    console.log("Server running");
  });