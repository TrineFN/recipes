import create from "zustand";
import data from "./data.json";
import { devtools } from 'zustand/middleware'

export interface Recipe {
  name: string;
  persons: number;
  img: string;
  ingredients: Array<Ingredient>;
  instructions: Array<string>;
}

export interface Ingredient {
  name: string;
  unit: string;
  amount: number;
}

export interface IngredientsList {
  [item: string]: Ingredient;
}


interface RootState {
  selectedRecipe?: string;
  recipes: Recipe[];
  mealPlan: Recipe[];
  addRecipeToMealPlan: (recipe: Recipe) => void;
  removeRecipeFromMealPlan: (recipe: Recipe) => void;
  selectRecipe: (recipeName: string) => void;
  updateRecipe: (recipe: Recipe) => void;
}

export const useStore = create<RootState>(devtools(set => ({
  recipes: data.recipes,
  mealPlan: [],
  addRecipeToMealPlan: (recipe) => set(state => ({
    mealPlan: [...state.mealPlan, recipe]
  })),
  removeRecipeFromMealPlan: (recipe) => set(state => ({
    mealPlan: state.mealPlan.filter(r => r.name !== recipe.name)
  })),
  selectRecipe: (recipeName) => set({ selectedRecipe: recipeName }),
  updateRecipe: (recipe) => set(state => ({ recipes: state.recipes.map(r => recipe.name === r.name ? recipe : r) }))
})));

export const selectShoppingItems = (state: RootState) =>
  state.mealPlan.reduce((acc: IngredientsList, curr) => {
    curr.ingredients.forEach(i => {
      if (acc[i.name]) {
        acc[i.name].amount += i.amount;
      } else {
        acc[i.name] = { ...i };
      }
    })
    return acc
  }, {})