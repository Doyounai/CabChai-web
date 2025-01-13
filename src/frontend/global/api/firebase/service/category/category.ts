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

export const UpdateCategory = async (paylaod: {
  uid: string;
  categoryID: string;
  cate: Category;
}): Promise<any> => {
  const { uid, categoryID, cate } = paylaod;

  try {
    const userRef = doc(collection(GetFirestore(), 'users'), uid);
    const categoryRef = collection(userRef, 'categorys');
    const categoryDoc = doc(categoryRef, categoryID);

    await setDoc(categoryDoc, cate, { merge: false });

    return {
      res: 'Success',
    };
  } catch (e) {
    return { error: e };
  }
};

export const CreateCategory = async (paylaod: {
  uid: string;
  cate: Category;
}): Promise<any> => {
  const { uid, cate } = paylaod;

  try {
    const userRef = doc(collection(GetFirestore(), 'users'), uid);
    const categoryRef = collection(userRef, 'categorys');
    const newCateDocRef = doc(categoryRef, cate.id);

    await setDoc(newCateDocRef, cate);
    // await addDoc(categoryRef, cate);

    return {
      res: 'Success',
    };
  } catch (e) {
    return { error: e };
  }
};
