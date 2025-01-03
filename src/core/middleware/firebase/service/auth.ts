import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { GetFirestore } from './firestore';
import { DefaultCategories } from './user-defaultdata';

let auth: Auth;
const provider = new GoogleAuthProvider();

export const AuthInit = async (app: FirebaseApp) => {
  auth = getAuth(app);
  console.log('Firebase Init Auth');
};

export const GetAuth = (): Auth => {
  return auth;
};

export const SignInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    let username = '';

    if (res.user) {
      const usersCollection = collection(GetFirestore(), 'users');
      const userDoc: DocumentSnapshot = await getDoc(doc(usersCollection, res.user.uid));

      username = userDoc.data()?.username;
    }

    return {
      res: {
        user: {
          uid: res.user?.uid,
          username: username,
        },
      },
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const Register = async (
  username: string,
  email: string,
  password: string,
): Promise<any> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user?.uid;

    const userDoc = await createNewUserProfile(uid, username);

    return userDoc;
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const SignInWithGoogle = async (): Promise<any> => {
  try {
    const res = await signInWithPopup(auth, provider);
    const userCollection = collection(GetFirestore(), 'users');
    const userDoc: DocumentSnapshot = await getDoc(doc(userCollection, res.user?.uid));

    if (!userDoc.exists()) {
      console.log('create new user profile');
      const userProfile = await createNewUserProfile(
        res.user?.uid,
        res.user?.displayName || '',
      );

      return userProfile;
    }

    return {
      res: {
        user: {
          uid: res.user?.uid,
          username: userDoc.data()?.username,
        },
      },
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

const createNewUserProfile = async (uid: string, username: string) => {
  try {
    const userCollection = collection(GetFirestore(), 'users');
    await setDoc(
      doc(userCollection, uid),
      {
        uid: uid,
        username: username,
      },
      { merge: true },
    );

    const userDoc: DocumentSnapshot = await getDoc(doc(userCollection, uid));
    const categoryCollection = collection(userDoc.ref, 'categorys');

    DefaultCategories.forEach(async (category) => {
      await setDoc(doc(categoryCollection, category.id), category, { merge: true });
    });

    return {
      res: {
        user: {
          uid: uid,
          username: username,
        },
      },
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};
