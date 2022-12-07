export function calculateRating(budget, currNutrition) {
  //const budget = { calories: 2500, protein: 250, carbs: 250, fat: 55 };
  //console.log("budget", budget);
  //console.log("currnutirtion ", currNutrition);
  let calorieRatio = currNutrition.calories / budget.calories;
  let proteinRatio = currNutrition.protein / budget.protein;
  let carbsRatio = currNutrition.carbs / budget.carbs;
  let fatRatio = currNutrition.fat / budget.fat;

  if (calorieRatio <= 1) {
    calorieRatio = calorieRatio * 0.52;
  } else {
    calorieRatio = (1 - (calorieRatio - 1)) * 0.52;
  }

  if (proteinRatio <= 1) {
    proteinRatio = proteinRatio * 0.16;
  } else {
    proteinRatio = (1 - (proteinRatio - 1)) * 0.16;
  }

  if (carbsRatio <= 1) {
    carbsRatio = carbsRatio * 0.16;
  } else {
    carbsRatio = (1 - (carbsRatio - 1)) * 0.16;
  }

  if (fatRatio <= 1) {
    fatRatio = fatRatio * 0.16;
  } else {
    fatRatio = (1 - (fatRatio - 1)) * 0.16;
  }

  let totalSum = (calorieRatio + proteinRatio + fatRatio + carbsRatio) * 10;

  return totalSum;
}
