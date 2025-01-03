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

export const GetCategory = async (payload: { uid: string }): Promise<any> => {
  const { uid } = payload;

  try {
    const userRef = doc(collection(GetFirestore(), 'users'), uid);
    const categoryRef = collection(userRef, 'categorys');
    const categorySnapshot = await getDocs(categoryRef);

    const categories: Category[] = categorySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Category;
    });

    // Sort categories by priority
    categories.sort((a, b) => {
      return a.priority - b.priority;
    });

    return {
      res: categories,
    };
  } catch (e) {
    return { error: e };
  }
};

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
