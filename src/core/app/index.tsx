import './index.scss';

import { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import p001CssShow from '../../frontend/domain/p001-css-show';
import p001Home from '../../frontend/domain/p001-home';
import p001Register from '../../frontend/domain/p001-register';
import AnimationBackground from '../../frontend/global/components/animation-background';
import RoutePrivate from '../../frontend/global/components/route-private';
import UILoading from '../../frontend/global/components/ui-loading';
import { WaitForMilliSecond } from '../../frontend/global/helper/time';
import { GetSetMethodStoreGlobal, UseStoreGlobal } from '../../frontend/global/store';
import Template from './template';

const i18nList: I18n[] = [p001Home.i18n, p001CssShow.i18n, p001Register.i18n];

const jsx = () => {
  const { isLoading } = UseStoreGlobal(['isLoading']);
  const { setIsLoading } = GetSetMethodStoreGlobal();

  useEffect(() => {
    (async () => {
      await WaitForMilliSecond(1400);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-full h-full relative">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<p001Home.JSX />} index />
              <Route path="/register" element={<p001Register.JSX />} />
              {/* Default page */}
              <Route path="*" element={<div className="">URL Not Found</div>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        <div className="absolute w-full h-full -z-10 top-0 left-0">
          <AnimationBackground />
        </div>
      </div>

      {isLoading && (
        <div className="absolute z-50 w-full h-full top-0">
          <UILoading />
        </div>
      )}
    </>
  );
};

export default { jsx, i18nList };
