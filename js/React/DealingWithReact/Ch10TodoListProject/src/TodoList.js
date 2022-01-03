import TodoListItem from "./TodoListItem";
import styled from "styled-components";
const List = styled.div`
	min-height: 320px;
	max-height: 513px;
	overflow-y: auto;
`
const TodoList = ({todos,onRemove,onToggle}) => {
	return (
		<List>
			{
				todos.map(todo => (<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>))
			}
		</List>
	)
}

export default TodoList