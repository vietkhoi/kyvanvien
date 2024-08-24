
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './admin/pages/Dashboard';
import Profile from './admin/pages/Profile';
import Story from './admin/pages/story/Story';
import StoryDetail from './admin/pages/story/StoryDetail';
import EditStory from './admin/pages/story/EditStory';
import ChapterList from './admin/pages/story/ChapterList';
import AddStory from './admin/pages/story/AddStory';
import ChapterDetail from './admin/pages/chapter/ChapterDetail';
import AddChapter from './admin/pages/chapter/AddChapter';
import Login from './admin/components/Login';
import { Listgenre } from './admin/pages/genre/Listgenre';
import AdminLayout from './AdminLayout';
import NoHeaderLayout from './NoHeaderLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';
import Home from './guest/pages/Home';
import StoryDetailHome from './guest/pages/StoryDetail';
import ChapterDetailHome from './guest/pages/ChapterDetaiHome';
import NapTien from './guest/pages/Naptien';
import BookCase from './guest/pages/BookCase';
import Account from './guest/pages/AccountPage';
import Filter from './guest/pages/Filter';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const account = useSelector(state => state.user.account);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(handleRefresh());
    }
  }, [dispatch]);

  

  

  return (
    <div className="App">
      {location.pathname.startsWith('/admin') && account.auth === false && <Navigate to="/admin/login" replace />}
      {location.pathname.startsWith('/admin') ? (
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* Admin Routes */}
            <Route path='' element={<ProtectedRoute roles={['ADMIN']}><Dashboard /></ProtectedRoute>} />
            <Route path='profile' element={<ProtectedRoute roles={['ADMIN']}><Profile /></ProtectedRoute>} />
            <Route path='liststory' element={<ProtectedRoute roles={['ADMIN']}><Story /></ProtectedRoute>} />
            <Route path='listgenre' element={<ProtectedRoute roles={['ADMIN']}><Listgenre /></ProtectedRoute>} />
            <Route path='story/:id' element={<ProtectedRoute roles={['ADMIN']}><StoryDetail /></ProtectedRoute>} />
            <Route path='story/edit/:id' element={<ProtectedRoute roles={['ADMIN']}><EditStory /></ProtectedRoute>} />
            <Route path='story/:id/chapters' element={<ProtectedRoute roles={['ADMIN']}><ChapterList /></ProtectedRoute>} />
            <Route path='addstory' element={<ProtectedRoute roles={['ADMIN']}><AddStory /></ProtectedRoute>} />
            <Route path="stories/:storyId/chapters/:chapterId" element={<ProtectedRoute roles={['ADMIN']}><ChapterDetail /></ProtectedRoute>} />
            <Route path='story/:id/addchapter' element={<ProtectedRoute roles={['ADMIN']}><AddChapter /></ProtectedRoute>} />
            {/* Route catch-all */}
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      ) : (
        <NoHeaderLayout>
          <Routes>
            {/* Client Routes */}
            {/* <Route path='/client/profile' element={<ClientProfile />} />
            <Route path='/client/liststory' element={<ClientStory />} />
            <Route path='/client/story/:id' element={<ClientStoryDetail />} /> */}
            
            <Route path='/' element={<Home />} />
            {/* <Route path='/truyen' element={<StoryDetailHome />} />
            <Route path='/truyen/chuong' element={<ChapterDetai />} /> */}
            <Route path="/truyen/:slug" element={<StoryDetailHome/>} />
            <Route path="/truyen/:slug/chuong/:number" element={<ChapterDetailHome />} />
            <Route path="/truyen/danh-sach" element={<Filter />} />
            <Route path="/tai-khoan/nap-tien" element={<NapTien/>} />
            <Route path="/tai-khoan/tu-truyen" element={<BookCase/>} />
            <Route path="/account" element={<Account/>} />
          </Routes>
        </NoHeaderLayout>
      )}
    </div>
  );
};

export default App;
