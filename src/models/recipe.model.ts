export interface IState {
  // array of recipes
    recipe: {
      id?: string,
      title: string,
      cookingTime: string,
      ingredients: string[],
      method: string[],
    }[]
  }

  export interface IList {
    title: string,
    sub: string,
  }