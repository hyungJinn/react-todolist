import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm();

  const handleValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => {
      const allToDos = [...oldToDos, { text: toDo, id: Date.now(), category }];
      const stringfiedAllToDos = JSON.stringify(allToDos);
      localStorage.setItem("ToDos", stringfiedAllToDos);
      return allToDos;
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />

      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
