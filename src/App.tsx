import './App.css';
import { useState } from 'react'
import Header from './component/Header';
import Navb from './component/Navb';
import SearchFilters from './component/SearchFilters';
import ToggleTheme from './component/ToggleTheme';
import Routers from './router/Routers';
import clsx from 'clsx';

function App() {
  const [enabled, setEnabled] = useState(false)
  const handleToggle = () => {
    setEnabled(!enabled)
  }
  return (
    <div className={clsx('App bg-[#f6f8fa]', enabled && 'dark')}>
      <div className='flex items-center justify-between  dark-bg '>
        <Header title="@CongPham05's untitled project" />
        <ToggleTheme enabled={enabled} handleToggle={handleToggle} />
      </div>
      <Navb />
      <SearchFilters />
      <Routers />
    </div>
  );
}

export default App;
