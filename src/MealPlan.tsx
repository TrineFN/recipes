import { IconButton, Typography } from "@material-ui/core";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { useState } from "react";
import { Recipe, useStore } from "./model";
import RecipeDetails from "./RecipeDetails";
import DeleteIcon from '@material-ui/icons/Delete';

export default function MealPlan() {
    const recipesOnMealPlan = useStore(state => state.mealPlan);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
    const removeRecipeFromMealPlan = useStore(state => state.removeRecipeFromMealPlan);

    const closeRecipeDetail = () => {
        setSelectedRecipe(undefined);
    }

    return (
        <>
            <Typography variant="h5" style={{ padding: "16px" }}>Meal Plan</Typography>
            <List>
                {recipesOnMealPlan.map(r =>
                    <ListItem button onClick={() => setSelectedRecipe(r)} key={r.name}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={r.img} />
                        </ListItemAvatar>
                        <ListItemText primary={r.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="remove recipe" onClick={() => removeRecipeFromMealPlan(r)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            {selectedRecipe && <RecipeDetails recipe={selectedRecipe} closeDetail={closeRecipeDetail} />}
        </>)
}