import { useEffect } from "react";

import { deleteTodo, getAllTodos } from "../redux/store";
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

import { useDispatch, useSelector } from "react-redux";

import Todo from "./Todo";
import Tabs from "./Tabs";

export const Todos = () => {

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todo);
  const currentTab = useSelector((state) => state.todos.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    } else if (currentTab === ACTIVE_TODOS) {
      return todos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return todos.filter((todo) => todo.done);
    }
    return todos;
  };

  const removeDoneTodos = () => {
    todos.forEach(({ done, id }) => {
      if (done) {
        dispatch(deleteTodo(id));
      }
    });
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px",height:"100vh"}}>
      <div>
        <Tabs currentTab={currentTab} />
      
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      {
                    getTodos().map(todo => (
                    
                        <Todo 
                            key={todo._id}
                            todo={todo}
                        />
                    
                    ))
                }
          </div>
          <div>
        {todos.some((todo) => todo.done) ? (
          <button onClick={removeDoneTodos} className="button clear">
            Remove Done Todos
          </button>
        ) : null}
        </div>
     
    </div>
  );
};

export default Todos;
