import MainPage from '../mainPage/MainPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
