import { ISubscribable, IWritable } from '../stores';

type StorageType = 'local' | 'session';

type SyncableStore<T> = ISubscribable<T> & Pick<IWritable<T>, 'set'>;

interface EncodingOptions<T> {
  encode?: (value: T) => string | undefined;
  decode?: (value: string) => T;
}

function syncToStorage<T>(
  store: SyncableStore<T>,
  key: string,
  type: StorageType,
  encodingOptions?: EncodingOptions<T>
): () => void {
  const storage = type === 'local' ? localStorage : sessionStorage;
  const storageValue = storage.getItem(key);
  if (storageValue != null) {
    const decodedValue = encodingOptions?.decode?.(storageValue) ?? (JSON.parse(storageValue) as T);
    store.set(decodedValue);
  }
  return store.subscribe((value: T) => {
    const encodedValue = encodingOptions?.encode?.(value) ?? JSON.stringify(value);
    storage.setItem(key, encodedValue);
  });
}

export function syncToLocalStorage<T>(
  store: SyncableStore<T>,
  key: string,
  encodingOptions?: EncodingOptions<T>
): () => void {
  return syncToStorage(store, key, 'local', encodingOptions);
}

export function syncToSessionStorage<T>(
  store: SyncableStore<T>,
  key: string,
  encodingOptions?: EncodingOptions<T>
): () => void {
  return syncToStorage(store, key, 'session', encodingOptions);
}
