import { useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './Pages/AuthPage/AuthPage'
import PageLayout from './Layout/PageLayout/PageLayout'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'
function App() {
  const [authUser]=useAuthState(auth)

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser?<HomePage></HomePage> : <Navigate to="/auth"/>}></Route>
        <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to="/"></Navigate>}></Route>
        <Route path='/:username' element={authUser ? <ProfilePage/> : <Navigate to="/"></Navigate>}></Route>
      </Routes>
    </PageLayout>
  )
}

export default App
