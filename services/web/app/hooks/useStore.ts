type StorageType = 'session' | 'local';
export const useStorage = () => {
  const storageType = (type: StorageType = 'local'): 'localStorage' | 'sessionStorage' =>
    `${type}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = <T>(key: string, type: StorageType = 'local'): T | null => {
    return isBrowser ? JSON.parse(window[storageType(type)][key]) : null;
  };

  const setItem = (key: string, value: any, type: StorageType = 'local'): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, JSON.stringify(value));
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type: StorageType = 'local'): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
