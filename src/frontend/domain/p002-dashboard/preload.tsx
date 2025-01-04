import { useEffect } from 'react';

import FirebaseAPI from '../../global/api/firebase';
import { GetCategory } from '../../global/api/firebase/service/category/category';
import { GetUserExpense } from '../../global/api/firebase/service/expense/expense';
import { UseStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';

const Preload = (props: IPreloadProps<IContentData>) => {
  const { auth } = UseStoreGlobalPersist(['auth']);

  useEffect(() => {
    (async () => {
      const category = await GetCategory({ uid: auth?.uid || '' });
      const expense = await GetUserExpense({ uid: auth?.uid || '' });

      props.onLoadComplete({
        category: category.res,
        expense: expense.res,
      });
    })();
  }, []);

  return <>Loading...</>;
};

export default Preload;
