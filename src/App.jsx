import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoDetails from "./components/TodoDetails/TodoDetails";
import { Skeleton } from "@mui/material";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialogue, setOpenDialogue] = useState(null);

  const fetchListOfTodos = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      console.log(result);
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
      } else {
        setTodoList([]);
        setLoading(false);
        setErrMsg("");
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Some Error Occured");
    }
  };

  const fetchDetailsOfCurrentTodo = async (getTodoId) => {
    console.log(getTodoId);
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getTodoId}`
      );
      const details = await apiResponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialogue(true);
      } else {
        setTodoDetails(null);
        setOpenDialogue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading) {
    <Skeleton varient="rectangular" width={650} height={650} />;
  }
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>
        SIMPLE TO-DO APP USING MATERIAL UI
      </h1>
      <div className={classes.todoItemWrapper}>
        {todoList && todoList?.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todos={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        openDialog={openDialogue}
        setOpenDialogue={setOpenDialogue}
        todoDetails={todoDetails}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
};

export default App;
