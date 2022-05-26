import { Store } from './store';

export function syncToLocalStorage<T>(store: Store<T>, key: string): void {
  const storageValue = localStorage.getItem(key);
  if (storageValue == null) {
    localStorage.setItem(key, JSON.stringify(store.value));
  } else {
    store.value = JSON.parse(storageValue);
  }

  store.subscribe((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export function syncToSessionStorage<T>(store: Store<T>, key: string): void {
  const storageValue = sessionStorage.getItem(key);
  if (storageValue == null) {
    sessionStorage.setItem(key, JSON.stringify(store.value));
  } else {
    store.value = JSON.parse(storageValue);
  }

  store.subscribe((value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
}
