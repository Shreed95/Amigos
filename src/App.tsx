import { Routes, Route } from 'react-router-dom';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import { AllUsers, CreatePost, EditPost, Explore, Home,Saved,PostDetails,Profile,UpdateProfile } from './root/pages';
import './globals.css';
import AuthLayout from './auth/AuthLayout';
import RootLayout from './root/RootLayout';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />} >
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App