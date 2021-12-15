import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("ToDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  const deleteToDo = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { parentElement },
    } = event;

    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter(
        (toDo) => toDo.id !== Number(parentElement?.id)
      );
      console.log(parentElement);
      const stringifiedNewTodos = JSON.stringify(newToDos);
      localStorage.setItem("ToDos", stringifiedNewTodos);
      return newToDos;
    });
  };

  return (
    <li id={id as any}>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>❌</button>
    </li>
  );
}

export default ToDo;
