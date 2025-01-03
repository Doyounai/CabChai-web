import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import {
  SignInWithEmailAndPassword,
  SignInWithGoogle,
} from '../../../core/middleware/firebase/service/auth';
import { GetSetMethodStoreGlobal } from '../../global/store';
import { GetSetMethodStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';

const Content = (props: { domainName: string; data?: IContentData }) => {
  const { domainName } = props;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation([domainName]);
  const { setIsLoading } = GetSetMethodStoreGlobal();
  const { setUserData } = GetSetMethodStoreGlobalPersist();

  const onSignInWithEmailPassword = (e: any) => {
    e.preventDefault();

    (async () => {
      setIsLoading(true);
      try {
        const res = await SignInWithEmailAndPassword(
          e.target.email.value,
          e.target.password.value,
        );

        console.log(res);
        if (res.error == undefined) {
          setUserData(res.res.user);
          navigate('/user/');
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    })();
  };

  const onSigninWithGoogle = (e: any) => {
    e.preventDefault();

    (async () => {
      try {
        const res = await SignInWithGoogle();

        console.log(res);
        if (res.error == undefined) {
          setUserData(res.res.user);
          navigate('/user/');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white items-center flex flex-col px-6 py-8 rounded-md ">
        <h1>Login to Cab Chai</h1>
        {/* login with email */}
        <div className="w-full h-full my-4">
          <form onSubmit={onSignInWithEmailPassword}>
            {/* email */}
            <div className="flex items-center space-x-2">
              <IoMdMail size={40} />
              <input
                id="email"
                type="email"
                className="w-full px-3 py-1 border-b-3"
                placeholder="Email"
                required
              />
            </div>
            {/* password */}
            <div className="flex items-center space-x-2">
              <IoMdLock size={40} />
              <input
                id="password"
                type="password"
                className="grow w-full px-3 py-1 border-b-3"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md "
            >
              Login
            </button>
          </form>
        </div>
        {/* login google */}
        <div className="w-full h-auto flex flex-col mt-3">
          {/* titile */}
          <div className="flex w-full relative items-center justify-center">
            <p className="text-nowrap z-10 bg-white px-3">Or Login with</p>
            {/* line */}
            <div className="px-2 absolute w-full">
              <div className="w-full h-[2px] bg-slate-300 rounded-full"></div>
            </div>
          </div>
          {/* button */}
          <button
            onClick={onSigninWithGoogle}
            className="mt-3 border-blue-500 border-3 py-2 px-2 items-center rounded-md flex justify-between"
          >
            <FcGoogle size={30} />
            <p className="text-blue-500 w-full">Login with Google</p>
          </button>
        </div>
        {/* register */}
        <div className="mt-6">
          <span className="flex space-x-1">
            <p className="text-slate-500">{"Don't have account?"}</p>
            <button
              onClick={() => {
                navigate('/register');
              }}
              className="text-blue-500"
            >
              Register
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Content;
