import QueryString from "qs"
import { useLocation } from "react-router-dom"
const About = () => {
	const location =useLocation()
	const query = QueryString.parse(location.search,{ignoreQueryPrefix:true})//?제거
	const showDetail = query.detail ==='true'//detail=true

	return (
		<div>
			<h1>소개</h1>
			<p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
			{showDetail && <p>detail is true</p>}
		</div>
	)
}

export default About