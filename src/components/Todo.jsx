import { MdDelete } from "react-icons/md";
import { toggleTodo} from "../redux/store";
import { deleteTodo } from "../redux/store";
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from "react-redux";
const Todo = ({ todo }) => {

    const dispatch = useDispatch();

    const handleCheckboxChange = () => {
        dispatch(toggleTodo(todo.id));
    }


    return (
        
        <div
            className="todo"
        
            style={{
                textDecoration: todo?.done ? 'line-through' : '',
                color: todo?.done ? 'green' : 'black',display:"flex",alignItems:"center",justifyContent:"space-between"
            }}
            data-testid="todo-test"
        >
          <Checkbox checked={!!todo?.done|false} onChange={handleCheckboxChange}/>
          
            <p style={{color: todo?.done ? 'green' : "black",margin:"0",width:"70%",overflow:"auto"}}>{todo?.title}</p>

            <MdDelete className="icon" onClick={() => dispatch(deleteTodo(todo.id))} style={{color:"rgb(32, 102, 241)",alignItems:"flex-end"}}/>
        </div>
       
    )
}

export default Todo;