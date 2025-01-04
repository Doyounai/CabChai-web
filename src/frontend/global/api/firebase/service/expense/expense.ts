import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';

import { GetFirestore } from '../../../../../../core/middleware/firebase/service/firestore';

export const CreateExpense = async (payload: {
  uid: string;
  expense: Expense;
}): Promise<any> => {
  const { uid, expense } = payload;

  try {
    const userRef = doc(collection(GetFirestore(), 'users'), uid);
    const expenseRef = collection(userRef, 'expenses');
    await addDoc(expenseRef, expense);

    return {
      res: 'Success',
    };
  } catch (e) {
    return { error: e };
  }
};

export const GetUserExpense = async (payload: {
  uid: string;
  range?: {
    start: string;
    end: string;
  };
}): Promise<any> => {
  const { uid, range = undefined } = payload;

  try {
    const userRef = doc(collection(GetFirestore(), 'users'), uid);
    let expenseRef: any = undefined;

    if (!range) {
      expenseRef = collection(userRef, 'expenses');
    } else {
      expenseRef = query(
        collection(userRef, 'expenses'),
        where('date', '>=', range.start),
        where('date', '<=', range.end),
      );
    }

    const expenseSnapshot = await getDocs(expenseRef);

    const res: Expense[] = expenseSnapshot.docs.map((doc) => {
      return doc.data() as Expense;
    });

    return {
      res: res,
    };
  } catch (e) {
    return { error: e };
  }
};
