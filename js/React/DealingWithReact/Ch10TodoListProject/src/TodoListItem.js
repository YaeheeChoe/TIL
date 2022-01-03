import { 
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdRemoveCircleOutline,
} from "react-icons/md";
import styled from "styled-components";

const ListItem = styled.div`
	padding: 1rem;
	display: flex;
	align-items	: center;
	&:nth-child(even) {
		background: #f8f9fa;
	}
`
const CheckBox = styled.div`
	cursor: pointer;
	flex: 1;
	display:flex;
	align-items: center;
	svg {
		font-size: 1.5rem;
		color: #22b8cf;
	}
`
const BoxText = styled.div`
	margin-left: 0.5rem;
	flex: 1;
	text-decoration: ${(props) => props.checked && "line-through"};
	color : ${(props) => props.checked && "#adb5bd"};
`
const Remove = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.5rem;
	color: #ff6b6b;
	cursor: pointer;
	&:hover{
		color: #ff8787;
	}
`
const TodoListItem = ({todo,onRemove,onToggle}) => {
	const {id,text,checked} = todo
	return (
		<ListItem>
			<CheckBox checked={checked} onClick={ () => onToggle(id)}>
			{checked ? <MdCheckBox/>: <MdCheckBoxOutlineBlank/>}
			<BoxText checked={checked}>{text}</BoxText>
			</CheckBox>
			<Remove onClick={() => onRemove(id)}>
				<MdRemoveCircleOutline/>
			</Remove>
		</ListItem>
	)
}

export default TodoListItem