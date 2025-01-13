import { useEffect } from 'react';

import FirebaseAPI from '../../global/api/firebase';
import { GetCategory } from '../../global/api/firebase/service/category/category';
import { UseStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';

const Preload = (props: IPreloadProps<IContentData>) => {
  const { auth } = UseStoreGlobalPersist(['auth']);

  useEffect(() => {
    (async () => {
      const categoryRes = await GetCategory({
        uid: auth?.uid || '',
      });

      props.onLoadComplete({
        category: categoryRes.res,
      });
    })();
  }, []);

  return <>Loading...</>;
};

export default Preload;
