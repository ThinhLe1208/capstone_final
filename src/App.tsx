import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './router';

import Loading from 'components/Loading';
import Offcanvas from 'components/Offcanvas';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from 'redux/configureStore';
import { UiControlState } from 'redux/slices/uiControlSlice';

function App() {
  const { isLoading }: UiControlState = useSelector((state: RootState) => state.uiControl);

  return (
    <>
      {/* notifications from toastify library */}
      <ToastContainer
        className='toast-position'
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
      />
      {/* loading screen */}
      {isLoading && <Loading />}
      {/* The modal which is at right side, contains forms  */}
      <Offcanvas />
      {/* main */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
