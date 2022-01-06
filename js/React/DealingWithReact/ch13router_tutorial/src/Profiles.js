import { Link,Outlet } from "react-router-dom";
import Profile from "./Profile";
import React from 'react'

function Profiles() {
	return (
		<div>
			<Outlet/>
			<h3>사용자 목록</h3>
			<p><Link to="/profiles/devlog">최예희 프로필</Link></p>
      <p><Link to="/profiles/gildong">홍길동 프로필</Link></p>
		</div>
	)
}

export default Profiles
