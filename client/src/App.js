import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js"
import { Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './componens/Header';
import AddBlog from './pages/AddBlog';
import AddCategory from './pages/AddCategory';
import SingleBlog from './pages/SingleBlog';
import PrivateRoute from './services/ProtectedRoutes'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes  */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
