import { useRouteError, useNavigate } from 'react-router-dom';

import NavBar from '@components/layout/NavBar/NavBar';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';
import Button from '@components/ui/Button/Button';

import errorImage from '@/assets/images/error-image.svg';

import styles from '@pages/ErrorPage/ErrorPage.module.css';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Main customClass={styles['main']}>
        <div className={styles['error_container']}>
          <div className={styles['image_container']}>
            <img
              className={styles['error_image']}
              src={errorImage}
              alt="error image"
            />
          </div>

          <div className={styles['error_content']}>
            <div className={styles['error_message_container']}>
              <h1>Oops! {error.status}</h1>
              <p>Sorry, an unexpected error has occurred.</p>
              <p>{error.statusText || error.message}</p>
            </div>
            <Button
              btnText="Go back"
              btnType="secondary"
              onClickFn={() => navigate(-1)}
            />
          </div>
        </div>
      </Main>

      <Footer />
    </>
  );
}
