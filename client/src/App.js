import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar/>
      <Grow in>
        <Container>
            <Grid item xs={12} sm={4}>
              <Form></Form>
            </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
