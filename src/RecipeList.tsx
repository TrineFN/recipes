import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Recipe, useStore } from "./model";
import RecipeDetails from "./RecipeDetails";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  tile: {
    '&:hover': {
      background: theme.palette.grey[500],
      cursor: "pointer",
    }
  },
}));

export default function RecipeList() {
  const recipesOnMealPlan = useStore(state => state.mealPlan.map(r => r.name));
  const recipes = useStore(state => state.recipes);
  const addRecipeToMealPlan = useStore(state => state.addRecipeToMealPlan);
  const removeRecipeFromMealPlan = useStore(state => state.removeRecipeFromMealPlan);
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();

  const closeRecipeDetail = () => {
    setSelectedRecipe(undefined);
  }
  const updateMealPlan = (recipe: Recipe) => {
    if (recipesOnMealPlan.includes(recipe.name)) {
      removeRecipeFromMealPlan(recipe);
    } else {
      addRecipeToMealPlan(recipe);
    }
  }
  return (
    <>
      <GridList>
        {recipes.map(r => (
          <GridListTile
            key={r.name}
            id={r.name}
            cols={1}
            rows={mobile ? 1 : 2}
            className={classes.tile}
            onClick={() => setSelectedRecipe(r)}
          >
            <img src={r.img} />
            <GridListTileBar
              title={r.name}
              actionIcon={
                <IconButton onClick={e => {
                  e.stopPropagation();
                  updateMealPlan(r);
                }}
                  color="secondary"
                >
                  {recipesOnMealPlan.includes(r.name) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} closeDetail={closeRecipeDetail} />}
    </>
  )
}