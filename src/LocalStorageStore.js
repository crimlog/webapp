import { writable } from 'svelte/store';

/**
 * Custom class that persists a Svelte store to local storage
 */
class Persisted {
	constructor(key, value = null) {
		value = JSON.parse(localStorage.getItem(key) ?? null) ?? value;
		this.store = writable(value);
		this.key = key;
		localStorage.setItem(key, JSON.stringify(value));

		return { ...this.store, set: this.set.bind(this), get: this.get.bind(this) };
	}

	get() {
		return JSON.parse(localStorage.getItem(this.key));
	}

	set(value) {
		const { store, key } = this;
		localStorage.setItem(key, JSON.stringify(value));
		store.set(value);
	}
}

export const persisted = (key, value) => new Persisted(key, value);
