import { Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/HomePage';
import Page404 from './components/Errors/Page404';
import UncontrolForm from './components/Forms/UncontrolForm';
import HookForm from './components/Forms/HookForm';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/uncontrol-form" element={<UncontrolForm />}></Route>
        <Route path="/hook-form" element={<HookForm />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
