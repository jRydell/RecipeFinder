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

type MealDBResponse = {
  meals: Meal[] | null;
};

type MealDbCategoryResponse = {
  categories: Category[] | null;
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type ServiceResponse<T> = {
  data: T | null;
  error: string | null;
};

export const mealDbService = {
  searchByName: async (name: string): Promise<ServiceResponse<Meal[]>> => {
    try {
      const response = await axios.get<MealDBResponse>(
        `${API_BASE}/search.php?s=${name}`
      );
      return {
        data: response.data.meals || [],
        error: null,
      };
    } catch (error) {
      console.error(`Error searching for "${name}":`, error);
      return {
        data: [],
        error: "Failed to search recipes. Please try again.",
      };
    }
  },

  getById: async (id: string): Promise<ServiceResponse<Meal>> => {
    try {
      const response = await axios.get<MealDBResponse>(
        `${API_BASE}/lookup.php?i=${id}`
      );
      const meal = response.data.meals?.[0] || null;
      return {
        data: meal,
        error: meal ? null : "Recipe not found",
      };
    } catch (error) {
      console.error(`Error fetching recipe ${id}:`, error);
      return {
        data: null,
        error: "Failed to load recipe details. Please try again.",
      };
    }
  },

  getCategories: async (): Promise<ServiceResponse<Category[]>> => {
    try {
      const response = await axios.get<MealDbCategoryResponse>(
        `${API_BASE}/categories.php`
      );
      return {
        data: response.data.categories || [],
        error: null,
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        data: [],
        error: "Failed to load categories. Please try again.",
      };
    }
  },

  filterByCategory: async (
    category: string
  ): Promise<ServiceResponse<Meal[]>> => {
    try {
      const response = await axios.get<MealDBResponse>(
        `${API_BASE}/filter.php?c=${category}`
      );
      return {
        data: response.data.meals || [],
        error: null,
      };
    } catch (error) {
      console.error(`Error filtering by category "${category}":`, error);
      return {
        data: [],
        error: "Failed to load recipes for this category. Please try again.",
      };
    }
  },

  getRandomMeal: async (): Promise<ServiceResponse<Meal>> => {
    try {
      const response = await axios.get<MealDBResponse>(
        `${API_BASE}/random.php`
      );
      return {
        data: response.data.meals?.[0] || null,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching random meal:", error);
      return {
        data: null,
        error: "Failed to load random recipe. Please try again.",
      };
    }
  },

  getRandomMeals: async (count: number): Promise<ServiceResponse<Meal[]>> => {
    try {
      // Create an array of promises for multiple random meal requests
      const requests = Array(count)
        .fill(0)
        .map(() => axios.get<MealDBResponse>(`${API_BASE}/random.php`));

      // Execute all requests in parallel
      const responses = await Promise.all(requests);

      // Extract the meals from each response and filter out any nulls
      const meals = responses
        .map((response) => response.data.meals?.[0])
        .filter((meal): meal is Meal => meal !== undefined && meal !== null);

      return {
        data: meals,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching random meals:", error);
      return {
        data: [],
        error: "Failed to load random recipes. Please try again.",
      };
    }
  },
};
