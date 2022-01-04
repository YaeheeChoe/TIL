import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import TodoTemplate from './TodoTemplate';
import { useState ,useCallback,useRef} from 'react';

function App() {
  const [todos,setTodos] = useState([{
    id :1,
    text:'일정관리 앱 제작',
    checked:false,
  },])
  const nextId = useRef(2)
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id : nextId.current,
        text,
        checked:false,
      }
      setTodos(todos.concat(todo));
      nextId.current +=1;
    },
    [todos,setTodos,nextId],
  )
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos,setTodos,nextId],
  )
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>  todo.id === id ? { ...todo, checked: !todo.checked}:todo,),
      )
    },[todos,setTodos,nextId],
  )
  //usememo 
  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos ={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  );
}

export default App;
