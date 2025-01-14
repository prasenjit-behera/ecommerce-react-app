// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SignInPage from './pages/Auth/SignIn';
import SignUpPage from './pages/Auth/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS globally
import ProfilePage from './pages/Profile/ProfilePage';
const App = () => {
  return (
    <>
    <ToastContainer />
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default Homepage */}
          <Route path="/products" element={<HomePage />} />
          <Route path="/cart" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
    </>

  );
};

export default App;
