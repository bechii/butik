import { Store } from './store';

export function syncToLocalStorage<T>(store: Store<T>, key: string, handleExistingStorageValue?: (value: T) => void): void {
  const storageValue = localStorage.getItem(key);
  if (storageValue != null) {
    const parsedValue = JSON.parse(storageValue);
    if (handleExistingStorageValue) {
      handleExistingStorageValue(parsedValue);
    } else {
      store.value = parsedValue;
    }
  }
  store.subscribe((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export function syncToSessionStorage<T>(store: Store<T>, key: string, handleExistingStorageValue?: (value: T) => void): void {
  const storageValue = sessionStorage.getItem(key);
  if (storageValue != null) {
    const parsedValue = JSON.parse(storageValue);
    if (handleExistingStorageValue) {
      handleExistingStorageValue(parsedValue);
    } else {
      store.value = parsedValue;
    }
  }
  store.subscribe((value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
}
