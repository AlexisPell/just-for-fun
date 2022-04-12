class StorageClass {
  private storage: Storage;
  constructor(typeStorage = 'local') {
    // @ts-ignore
    this.storage = window[`${typeStorage}Storage` as any];
  }

  setItem = (key: string, value: unknown) => {
    const item = JSON.stringify(value);
    this.storage.setItem(key, item);
  };

  getItem = (key: string): any | null => {
    const itemJson = this.storage.getItem(key);

    if (!itemJson) {
      return null;
    }

    return JSON.parse(itemJson);
  };

  clear = (key: string) => this.storage.removeItem(key);

  clearAll = () => {
    Object.keys(this.storage).forEach((key) => {
      this.storage.removeItem(key);
    });
  };
}

const USER_KEY = 'user';

const storageKeys = {
  user: USER_KEY,
};
const local = new StorageClass('local');
const session = new StorageClass('session');

export const storageService = { local, session, storageKeys };
