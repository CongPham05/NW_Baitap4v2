import './App.css';
import Routers from './router/Routers';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { useSelector } from "react-redux";
import { loadingSelector, themSelector } from './redux/selectors';
import { useEffect } from 'react';
import socket from './socket';

const App: React.FC = () => {
  const loading = useSelector(loadingSelector)
  const enabled = useSelector(themSelector)

  useEffect(() => {
    socket.connect();
    return (() => {
      socket.disconnect();
    })
  }, [])

  const override = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(0 0 0 /30%)',
    zIndex: "99999",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }


  return (
    <div className='App'>
      <div className={clsx(' bg-[#f6f8fa] flex flex-col h-full', enabled && 'dark')}>
        <SyncLoader loading={loading} color="#36d7b7" margin={5} size={8} cssOverride={override} />
        <ToastContainer />
        <Routers />
      </div>
    </div>
  );
}

export default App;
