import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StateMapping } from '../helper/zustand';

type TypeStoreGlobalPersist = {
  name: string;
  auth: User;
};

const StoreGlobalPersist = create(
  persist((): TypeStoreGlobalPersist => ({ name: 'gnok', auth: null }), {
    name: 'storage',
  }),
);

type TypeSetMethodStoreGlobalPersist = {
  setName: (name: string) => void;
  setUserData: (userData: User) => void;
};

const SetMethodStoreGlobalPersist: TypeSetMethodStoreGlobalPersist = {
  setName: (name: string) => {
    StoreGlobalPersist.setState({ name: name });
  },
  setUserData: (userData: User) => {
    console.log(userData);
    StoreGlobalPersist.setState({ auth: userData });
  },
};

export const UseStoreGlobalPersist = (
  stateList: string[],
  isShallow?: boolean,
): TypeStoreGlobalPersist => {
  return StateMapping(stateList, StoreGlobalPersist, isShallow) as TypeStoreGlobalPersist;
};

export const GetSetMethodStoreGlobalPersist = (): TypeSetMethodStoreGlobalPersist => {
  return SetMethodStoreGlobalPersist;
};
