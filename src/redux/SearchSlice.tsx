import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../helper/instance/Instance';

export interface Category {
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
  strMeal: string; // Add strMeal property to Category
  strMealThumb: string;
  strInstructions: string;
  idMeal: number;
}

interface Recipe {
  strMealThumb: string;
  idMeal: number;
  strMeal: string; // Include strMeal in Recipe interface
  strCategoryDescription: string;
  strInstructions: string;
}

interface MealSearchState {
  searchResults: Recipe[];
  loading: boolean;
  error: MyError | null;
}

interface MyError {
  message: string;
}

export const searchRecipes = createAsyncThunk(
  'meals/searchRecipes',
  async (searchQuery: string) => {
    try {
      const response = await instance.get('search.php?s', { params: { q: searchQuery } });

      const allRecipes = response.data.meals as Category[];
      const filteredRecipes = allRecipes.filter((recipe) => {
        return recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      });

      return filteredRecipes as Recipe[]; // Correct return type
    } catch (error) {
      throw ('Error searching recipes'); // Throw specific error type
    }
  }
);

const initialState: MealSearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const mealSearchSlice = createSlice({
  name: 'mealSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        const recipes = action.payload || [];
        state.searchResults = recipes;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as MyError;
        }
      });
  },
});

export default mealSearchSlice.reducer;