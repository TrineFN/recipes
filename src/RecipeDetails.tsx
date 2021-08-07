import { Typography, FormControlLabel, Checkbox, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, useTheme, useMediaQuery, IconButton, TextField } from "@material-ui/core";
import { Recipe, useStore } from "./model";
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  recipe: Recipe;
  closeDetail: () => void;
}

export default function RecipeDetails({ recipe, closeDetail }: Props) {
  const recipesOnMealPlan = useStore(state => state.mealPlan.map(r => r.name));
  const addRecipeToMealPlan = useStore(state => state.addRecipeToMealPlan);
  const removeRecipeFromMealPlan = useStore(state => state.removeRecipeFromMealPlan);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const updateMealPlan = (e: React.ChangeEvent<{}>, checked: Boolean) => {
    if (checked) {
      addRecipeToMealPlan(recipe);
    } else {
      removeRecipeFromMealPlan(recipe);
    }
  }
  return (
    <Dialog open fullScreen={fullScreen} onClose={closeDetail}>
      <DialogTitle>
        {recipe.name}

        <IconButton onClick={closeDetail} style={{ position: "absolute", right: theme.spacing(1), top: theme.spacing(1) }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img src={recipe.img} style={{ maxHeight: "300px" }} />
        <div style={{ textAlign: "left" }}>
          <FormControlLabel
            value={recipe.name}
            control={<Checkbox color="primary" />}
            label="Add to shopping list"
            labelPlacement="end"
            checked={recipesOnMealPlan.includes(recipe.name)}
            onChange={(e, checked) => updateMealPlan(e, checked)}
          />
        </div>
        Persons:<TextField type="number"> {recipe.persons}</TextField>
        <Typography variant="subtitle1" align='left'>Ingredients:</Typography>
        <List>
          {recipe.ingredients.map(i => (
            <ListItem key={i.name}>
              <ListItemText
                primary={`${i.amount} ${i.unit} ${i.name}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" align='left'>Intructions:</Typography>
        <List>
          {recipe.instructions.map((i, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`Step ${idx + 1}: ${i}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}