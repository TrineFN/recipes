import { Grid, Fab, Container } from "@material-ui/core";
import MealPlan from './MealPlan';
import RecipeList from './RecipeList';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useState } from "react";
import ShoppingList from "./ShoppingList";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Container style={{ textAlign: "center", padding: "16px" }}>
          <Fab color="primary" onClick={() => setOpen(true)}><ShoppingBasketIcon /></Fab>
        </Container>
        <MealPlan />
        <ShoppingList open={open} setOpen={setOpen} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <RecipeList />
      </Grid>
    </Grid>
  );
}

export default App;