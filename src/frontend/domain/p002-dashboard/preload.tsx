import { useEffect } from 'react';

import FirebaseAPI from '../../global/api/firebase';
import { GetCategory } from '../../global/api/firebase/service/category/category';
import { GetUserExpense } from '../../global/api/firebase/service/expense/expense';
import { UseStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';

const GetStartEndOfMonth = (): { start: string; end: string } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`;
  };

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};

const Preload = (props: IPreloadProps<IContentData>) => {
  const { auth } = UseStoreGlobalPersist(['auth']);

  useEffect(() => {
    (async () => {
      const category = await GetCategory({ uid: auth?.uid || '' });

      const expense = await GetUserExpense({
        uid: auth?.uid || '',
        range: GetStartEndOfMonth(),
      });

      props.onLoadComplete({
        category: category.res,
        expense: expense.res,
      });
    })();
  }, []);

  return <>Loading...</>;
};

export default Preload;
