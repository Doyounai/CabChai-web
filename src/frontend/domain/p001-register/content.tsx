import { FaUser } from 'react-icons/fa';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Register } from '../../../core/middleware/firebase/service/auth';
import { GetSetMethodStoreGlobal } from '../../global/store';
import { IContentData } from '.';

const Content = (props: { domainName: string; data?: IContentData | null }) => {
  const { domainName } = props;
  const navigate = useNavigate();
  const { setIsLoading } = GetSetMethodStoreGlobal();

  const onRegsiterWithEmailAndPassword = (e: any) => {
    e.preventDefault();

    (async () => {
      setIsLoading(true);
      try {
        const res = await Register(
          e.target.username.value,
          e.target.email.value,
          e.target.password.value,
        );

        console.log(res);
        if (res.error == undefined) navigate('/');
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    })();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white items-center flex flex-col px-6 py-8 rounded-md ">
        <h1>Register to Cab Chai</h1>
        {/* login with email */}
        <div className="w-full h-full my-4">
          <form onSubmit={onRegsiterWithEmailAndPassword}>
            {/* username */}
            <div className="flex items-center space-x-2">
              <FaUser size={30} />
              <input
                id="username"
                type="text"
                className="w-full px-3 py-1 border-b-3"
                placeholder="Username"
              />
            </div>
            {/* email */}
            <div className="flex items-center space-x-2">
              <IoMdMail size={40} />
              <input
                id="email"
                type="email"
                className="w-full px-3 py-1 border-b-3"
                placeholder="Email"
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
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md "
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Content;
