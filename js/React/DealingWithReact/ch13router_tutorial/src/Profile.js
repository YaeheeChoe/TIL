
import { useParams } from 'react-router-dom'
const data = {
	devlog : {
		name: '최예희',
		description: '커여운 개발자',
	},
	gildong : {
		name: '홍길동',
		description: '개발자2',
	}
}
const Profile = () => {
	const username = useParams().username
	const profile =data[username]
	console.log(username)
	if (!profile){
		return <div>사용자 정보가 없습니다.</div>
	}
	return (
		<div>
			<h3>
				{username}({profile.name})
			</h3>
			<p>{profile.description}</p>
		</div>
	)
}
export default Profile