[![NPM Version](https://img.shields.io/npm/v/butik.svg?style=for-the-badge)](https://www.npmjs.com/package/butik)

# 🏪 butik

A fresh alternative to [Svelte](https://github.com/sveltejs/svelte)'s built-in stores.

## 💾 Install

```bash
npm i butik
```

## ⚡ Quick example

```
// stores.ts

import { ArrayStore } from 'butik';

export const store = new ArrayStore<string>([]);
```

```
// Svelte component

<script lang="ts">
  import { store } from '$lib/stores';

  const options = ['item 1', 'item 2', 'item 3', 'item 4'];
</script>

{#each options as option}
  <input type="checkbox"
    checked={store.has(option)}
    on:change={() => store.toggle(option)}
  >
{/each}
```

## 🔨 API

Even though this package is meant to be used with Svelte, it is framework agnostic.
Butik's stores follows the [store contract](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values) allowing `$`-prefixing for stuff like auto-subscriptions and two-way data binding.

<details>
<summary>Base interfaces</summary>

```
interface ISubscribable<T> {
  subscribe(listener: EventListener<T>): () => void;
}

interface IReadable<T> {
  get(): Readonly<T>;
}

interface IWritable<T> {
  set(value: T): void;
  update(updater: (value: T) => T): void;
}
```

</details>

<details>
<summary>Store</summary>
Base class for all editable stores and can also be instantiated as itself.
<br>
<br>

```
get(): Readonly<T>
set(value: T): void
update(updater: (value: T) => T): void
subscribe(listener: (value: T) => void): () => void
```

```
// stores.ts

import { Store } from 'butik';

export const store = new Store<string>('');
```

```
// Svelte component

<script lang="ts">
  import { store } from '$lib/stores';
</script>

<input type="text" bind:value={$store}/>
```

</details>

<details>
<summary>DerivedStore</summary>

```
constructor(store: ISubscribable<T>, derive: (value: T) => U)
```

```
// stores.ts

import { Store, DerivedStore } from 'butik';

export const store = new Store<string>('');

const regEx = new RegExp(/^(?!.*\s).{4,30}$/);
export const derivedStore = new DerivedStore(store, (value) => {
  return regEx.test(value);
});
```

```
// Svelte component

<script lang="ts">
  import { store, derivedStore } from '$lib/stores';
</script>

<input type="text" bind:value={$store}/>
<button disabled={!$derivedStore}>Submit</button>
```

</details>

<details>
<summary>ArrayStore</summary>

```
count(): number
has(arg: T | ((value: T) => boolean)): boolean
add(arg: T | T[]): void
remove(arg: T | T[] | ((value: T) => boolean)): void
toggle(item: T): void
```

```
// stores.ts

import { ArrayStore } from 'butik';

export const store = new ArrayStore<string>([]);
```

```
// Svelte component

<script lang="ts">
  import { store } from '$lib/stores';

  const options = ['item 1', 'item 2', 'item 3', 'item 4'];
</script>

{#each options as option}
  <input type="checkbox"
    checked={store.has(option)}
    on:change={() => store.toggle(option)}
  >
{/each}
```

</details>

<details>
<summary>BooleanStore</summary>

```
toggle(): void
```

```
// stores.ts

import { BooleanStore } from 'butik';

export const store = new BooleanStore(false);
```

```
// Svelte component

<script lang="ts">
  import { store } from '$lib/stores';
</script>

<input type="checkbox" bind:checked={$store}/>
```

</details>

<details>
<summary>NumberStore</summary>

```
constructor(value: number, min: number | undefined = undefined, max: number | undefined = undefined)
add(amount: number): void
```

```
// stores.ts

import { NumberStore } from 'butik';

export const numberStore = new NumberStore(0, 0, 10);
```

```
// Svelte component

<script lang="ts">
  import { numberStore } from '$lib/stores';
</script>

<input type="number"
  bind:value={$numberStore}
  min={numberStore.min}
  max={numberStore.max}
/>
```

</details>

<details>
<summary>ObjectStore</summary>

```
patch(partial: Partial<T>): void
```

```
// stores.ts

import { ObjectStore } from 'butik';

export const objectStore = new ObjectStore({
  name: 'John Doe',
  age: 50
});
```

```
// Svelte component

<script lang="ts">
  import { objectStore } from '$lib/stores';
</script>

<input type="number"
  value={$objectStore.age}
  on:change={(e) => objectStore.patch({ age: e.currentTarget.valueAsNumber })}
/>
```

</details>

<details>
<summary>Tween</summary>

```
duration: number
easeMethod: EaseMethod
constructor(value: number = 0, duration: number = 1000, easeMethod: EaseMethod = cubInOut)
start(targetValue: number, onDone?: () => void): void
stop(): void
```

```
// Svelte component

<script lang="ts">
  import { Tween } from 'butik';

  const tween = new Tween(0, 3000);
</script>

<p style:fontSize={$tween}>{$tween}</p>
<button on:click={() => tween.start(48)}>Start</button>
```

</details>

<details>
<summary>LocalStorage & SessionStorage</summary>
Utility methods to sync stores with localStorage and sessionStorage which returns a callback to unsync again.
Besides receiving a store and a storage key as parameters, they can also have custom encoding logic.
If no encoding options are passed, JSON.stringify and JSON.parse is used.
<br>
<br>

```
interface EncodingOptions<T> {
  encode?: (value: T) => string | undefined;
  decode?: (value: string) => T;
}

syncToLocalStorage<T>(store: IStore<T>, key: string, encodingOptions?: EncodingOptions<T>): () => void
syncToSessionStorage<T>(store: IStore<T>, key: string, encodingOptions?: EncodingOptions<T>): () => void
```

```
// stores.ts

import { BooleanStore } from 'butik';

export const store = new BooleanStore(false);

syncToLocalStorage(store, 'storage_key');
```

</details>
