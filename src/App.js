import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Shopping from "./pages/Shopping";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";




function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/community' element={<Community/>} />
        <Route path='/mypage' element={<MyPage/>} />
        <Route path='/shopping' element={<Shopping/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Layout>
  );
}

export default App;
