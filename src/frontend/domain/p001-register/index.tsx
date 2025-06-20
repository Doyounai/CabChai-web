import './index.scss';

import { lazy, Suspense, useState } from 'react';

import { I18nDomainResource } from './i18n';

const domainName = 'register';
const i18n = I18nDomainResource(domainName);

const Preload = lazy(() => import('./preload'));
const Content = lazy(() => import('./content'));

export interface IContentData {
  data: User;
}

const JSX = () => {
  const [data, setData] = useState<IContentData | null>(null);

  return (
    <Suspense>
      <Content domainName={domainName} data={data} />
    </Suspense>
  );
};

export default { JSX, i18n };
