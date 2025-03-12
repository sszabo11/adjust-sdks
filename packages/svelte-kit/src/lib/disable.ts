import { page } from '$app/state';
import { hasContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export function disableAds(expression: boolean) {
	let path = page.url.pathname;

	//disableStore.update((prev) => {
	//  if (expression) {
	//    return { ...prev, paths: [...prev.paths, path] };
	//  } else {
	//    prev.paths = prev.paths.filter((p) => p !== path);

	//    return prev;
	//  }
	//});
	let key = `disabled:${path}`;
	console.log('key', key);
	if (expression) {
		setContext(key, true);
	} else {
		if (hasContext(key)) setContext(key, false);
	}
}
