import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// export const toDoState = atom<IToDo[]>({
//   key: "toDo",
//   default: [],
// });

const localStorageToDos = localStorage.getItem("ToDos");
const parsedToDos = JSON.parse(localStorageToDos as any);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: parsedToDos?.length > 0 ? parsedToDos : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const nowToDos = get(toDoState);
    const nowCategory = get(categoryState);

    return nowToDos.filter((toDo) => toDo.category === nowCategory);
  },
});
