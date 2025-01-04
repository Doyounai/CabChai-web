export const CategoriesColors: string[] = ['#640D5F', '#D91656', '#EB5B00', '#FFB200'];

export const GetCategoryByID = (id: string, category: Category[]): Category | null => {
  return category.filter((cate) => cate.id == id)[0]
    ? category.filter((cate) => cate.id == id)[0]
    : null;
};
