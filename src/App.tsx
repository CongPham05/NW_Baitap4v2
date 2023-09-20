import './App.css';
import { useState } from 'react'
import Header from './component/Header';
import Navb from './component/Navb';
import SearchFilters from './component/SearchFilters';
import Routers from './router/Routers';
import clsx from 'clsx';

function App() {
  const [enabled, setEnabled] = useState(false)
  const handleToggle = () => {
    setEnabled(!enabled)
  }
  return (
    <div className={clsx('App bg-[#f6f8fa]', enabled && 'dark')}>
      <Header enabled={enabled} handleToggle={handleToggle} />
      <Navb />
      <SearchFilters />
      <Routers />
    </div>
  );
}

export default App;
