
import { Route, Routes } from 'react-router-dom'
import LoginForm, { LoginOptions } from './Login/LoginForm'
import SignInFinish from '../pages/SignInFinish'
import Home from '../pages/Home'
import EmailVerify from '../pages/EmailVerify'
import BlogWithPagination from './BlogWithPagination'
import About from '../pages/About'
import CreatePostWithProvider from './CreatePostWithProvider'
import ContactFormWithProvider from './ContactFormWithProvider'
import EditBlogWithProvider from './EditBlogWithProvider'
import BlogWithBlogProvider from './BlogWithBlogProvider'
import NotFound from '../pages/NotFound'
import AuthorWithProvider from './AuthorWithProvider'
import ProfileWithProvider from './ProfileWithProvider'
import DashboardWithProvider from './DashboardWithProvider'
import FeedbackWithProvider from './FeedbackWithProvider'
import MyBlogsWithProvider from './MyBlogsWithProvider'
import EligibleToUpdateBlogsWithProvider from './EligibleToUpdateBlogsWithProvider'
import Bookmarks from '../pages/Bookmarks'
import FeedbackHistory from '../pages/FeedbackHistory'
import Setting from '../pages/Setting'
import CreateAuthor from '../pages/CreateAuthor'
import AuthorProvider from '../Provider/AuthorProvider'
import CollaborationWithProvider from './CollaborationWithProvider'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='login/:type' element={<LoginForm />}></Route>
        <Route path='login' element={<LoginOptions />}></Route>
        <Route path='finishSignIn' element={<SignInFinish />}></Route>
        <Route index path='/' element={<Home />}></Route>
        <Route path='email-verify' element={<EmailVerify />}></Route>
        <Route path="blogs" element={<BlogWithPagination />} />
        <Route path="blogs/:blog_id" element={<BlogWithBlogProvider />} />
        <Route path='about' element={<About />}></Route>
        <Route path='contact' element={<ContactFormWithProvider />}></Route>
        <Route path='create-post' element={<CreatePostWithProvider />}></Route>
        <Route path='edit-post' element={<EditBlogWithProvider />}></Route>
        <Route path='author/:author_id' element={<AuthorWithProvider />}></Route>
        <Route path='author/profile/:author_id' element={<ProfileWithProvider />}></Route>
        <Route path='author/:author_id/dashboard/' element={<DashboardWithProvider />}></Route>
        <Route path='author/blog/:blog_id/feedback/' element={<FeedbackWithProvider />}></Route>
        <Route path='author/blogs/:author_id' element={<MyBlogsWithProvider />}></Route>
        <Route path='author/blog/:blog_id/edit' element={<EditBlogWithProvider />}></Route>
        <Route path='author/blog/:user_id/eligible/edit/' element={<EligibleToUpdateBlogsWithProvider />}></Route>
        <Route path='user/bookmarks' element={<Bookmarks />}></Route>
        <Route path='user/feedbacks-history/' element={<FeedbackHistory />}></Route>
        <Route path='settings/' element={<Setting />}></Route>
        <Route path='create-author-account' element={<AuthorProvider><CreateAuthor /></AuthorProvider>}></Route>
        <Route path='collaboration' element={<CollaborationWithProvider />}></Route>

        <Route path='collaboration/:room_id' element={<CollaborationWithProvider />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRoutes
