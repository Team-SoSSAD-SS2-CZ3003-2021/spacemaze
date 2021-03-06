import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userAuth, logoutUser } from '../recoil/users'
import { pageTabState } from "../recoil/atoms"

export default function Toolbar({history}) {
  const [auth, setAuth] = useRecoilState(userAuth)
  const setContent = useSetRecoilState(pageTabState)
  const menuClick = e => setContent(e.target.dataset.tolink)
  // const setNotification = useSetRecoilState(commonNotification)

  // onLogout
  const onLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    })

    // setNotification({
    //   message: 'Logged out successfully.',
    //   isVisible: true
    // })

    logoutUser()
    // history.push(routes.user.login)
    history.push('/')
    location.reload()
  }
  const isAuthUser = auth?.isAuthenticated

  return (
    <div className="toolbar">
      <Link to={isAuthUser ? "/game" : "/login"} data-tolink={isAuthUser ? "game" : "login"} onClick={menuClick}>Game</Link> 
      <Link to={isAuthUser ? "/leaderboard" : "/login"} data-tolink={isAuthUser ? "teams" : "login"} onClick={menuClick}>Leaderboard</Link> 
      <div className="logo" role="button" title="logo" tabIndex="0" data-click="showLocation/teams,toggleMenu" >
        <Link to={isAuthUser ? "/game" : "/login"} onClick={isAuthUser ? null : menuClick} data-tolink="login" style={{width: "100%", height: "100%", display: "block", border: "none"}} />
      </div>
      <Link to={isAuthUser ? "/topics" : "/login"} data-tolink={isAuthUser ? "challenges" : "login"} onClick={menuClick}>Topics</Link> 
      <Link to="/login" className="sb-login-link" data-tolink="login" data-team-name={isAuthUser ? auth?.user?.bio?.displayName : null} onClick={isAuthUser ? onLogout : menuClick}/> 
    </div>
  )
}
