[![NPM Version](https://img.shields.io/npm/v/butik.svg?style=for-the-badge)](https://www.npmjs.com/package/butik)

# 🏪 butik
A fresh alternative to [Svelte](https://github.com/sveltejs/svelte)'s built-in stores.

## 💾 Install
```bash
npm i butik
```

## ⚡ Quick example

## 🔨 API
Even though this package is meant to be used with Svelte there is no hard link between them, thus it can be used anywhere.
Butik's stores follows the [store contract](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values) allowing ```$```-prefixing for stuff like auto-subscriptions and two-way data binding.

<details>
<summary>IStore</summary>
Interface implemented by Store and DerivedStore. All stores can be casted into this interface in order to make it read-only.
The subscribe method returns a method to unsubscribe.
<br>
<br>
  
```
get value(): T
subscribe(callback: (value: T) => void): (() => void)
```

</details>

<details>
<summary>Store</summary>
This is the base class for all editable stores and can also be used on its own.
<br>
<br>
  
```
set value(value: T)
set(value: T): void
update(updater: (value: T) => T): void
```

```
CODE EXAMPLE
```

</details>

<details>
<summary>DerivedStore</summary>

```
constructor(store: IStore<T>, derive: (value: T) => U)
```

```
CODE EXAMPLE
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
CODE EXAMPLE
```

</details>

<details>
<summary>BooleanStore</summary>

```
toggle(): void
```

```
CODE EXAMPLE
```

</details>

<details>
<summary>NumberStore</summary>

```
constructor(value: number, min: number | undefined = undefined, max: number | undefined = undefined)
add(amount: number): void
```

```
CODE EXAMPLE
```

</details>

<details>
<summary>ObjectStore</summary>

```
patch(partial: Partial<T>): void
```

```
CODE EXAMPLE
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
CODE EXAMPLE
```

</details>

<details>
<summary>Custom stores</summary>

```
CODE EXAMPLE
```

</details>
