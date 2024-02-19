
import { createSlice,configureStore } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";


const initialState = {
    todo: [],
    currentTab: "All Todos"
  };
  const persistedState = JSON.parse(localStorage.getItem("reduxState"))?.todos || initialState;
const todoSlice = createSlice({
    name: "todos",
    initialState:persistedState,
    reducers: {
        addNewTodo: (state,action) => {
            const unique_id = uuid();
            const small_id = unique_id.slice(0, 8);
            const newTodo = {
               id: small_id,
               title: action.payload,
               currentTab: "ALL_TODOS",
               done: false
            };
           console.log(initialState.todo);
            return {
                ...state,
                todo: [ newTodo,...state.todo]
            }
        },
        getAllTodos: (state, action) => {
            return state;
        },
        toggleTodo: (state, action) => {
            const tmp=[...state.todo]
            const updatedState = tmp.map(todo =>
                todo.id === action.payload ? { ...todo, done: !todo.done } : todo
            );
            console.log(updatedState);
            return {...state,todo:[...updatedState]};
        },
        updateTodo: (state, action) => {
            const tmp=[...state.todo]
            const updatedState = tmp.map(todo =>
                todo._id === action.payload ? { ...todo, data: action.payload.data } : todo
            );
            return {...state,todo:[...updatedState]};
        },
        deleteTodo: (state, action) => {
           const tmp=[...state.todo]
           const updatedState = tmp.filter(todo => todo.id !== action.payload);
           return {...state,todo:[...updatedState]};
        },
        toggleTab: (state, action) => {
            console.log(action.payload,state.currentTab)
            state.currentTab = action.payload;
        }
    }
});
export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer
    }
});
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });
  

export const { addNewTodo, getAllTodos, toggleTodo, updateTodo, deleteTodo,toggleTab } = todoSlice.actions;

export default todoSlice.reducer;
