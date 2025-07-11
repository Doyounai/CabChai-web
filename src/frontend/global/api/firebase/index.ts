import { TypeRepositoryPattern } from './repository-pattern';
import APIFirebase from './service';

const FirebaseAPI: TypeRepositoryPattern = {
  ...APIFirebase,
};

export const FirestoreAutoId = (): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export default FirebaseAPI;
