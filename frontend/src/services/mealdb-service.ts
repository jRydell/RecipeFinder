// src/services/mealdb-service.ts
import axios from "axios";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;

  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export const mealDbService = {
  searchByName: async (name: string) => {
    const response = await axios.get(`${API_BASE}/search.php?s=${name}`);
    return response.data.meals || [];
  },

  getById: async (id: string) => {
    const response = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_BASE}/categories.php`);
    return response.data.categories || [];
  },

  filterByCategory: async (category: string) => {
    const response = await axios.get(`${API_BASE}/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  getRandomMeal: async () => {
    const response = await axios.get(`${API_BASE}/random.php`);
    return response.data.meals?.[0] || null;
  },
};
