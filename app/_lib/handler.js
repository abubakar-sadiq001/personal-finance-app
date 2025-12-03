"use server"

import { getAllCategories, getBudgets, getThemeColors } from "./data-services"

export async function loadBudgets() {
  return await getBudgets()
}

export async function loadCategories() {
  return await getAllCategories()
}

export async function loadThemes() {
  return await getThemeColors()
}
