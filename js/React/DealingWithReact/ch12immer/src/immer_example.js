import produce from 'immer'
const originalState= [
	{
		id :1,
		todo: '전개연산자 배열 내장함수로 불변성 유지',
		checked: true,
	},
	{
		id:2,
		todo:'immer로 불변성 유지',
		checked:false,
	}
]

const nextState =produce(originalState,draft =>{
	const todo = draft.find(t => t.id ===2)
	todo.checked =true
})
draft.push({
	id: 3,
	todo: '일정관리 앱에 todo 적용',
	checked : false,
})
draft.splice(draft.findIndex(t => t.id ===1),1)