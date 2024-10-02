const cache = new Map();

//Gets cached data
export const getCache = (key: string) => {
	if (cache.has(key)) {
		console.log(`Cache key attempting to be accessed:`, key);
		const { value, dirty } = cache.get(key);
		console.log(`Cache value, dirty boolean:`, value, dirty);
		if (dirty) {
			console.log(`Cache was dirty, dumping`);
			cache.delete(key);
			return null;
		}
		console.log(`Cache was clean, returning from cache`);
		return value;
	}
	return null;
};

export const setCache = (key, value, ttl = 3600, dirty = false) => {
	cache.set(key, { value, dirty });
	console.log(`Setting cache for key:`, key);

	setTimeout(() => {
		cache.delete(key);
		console.log(`Cache expired for`, key);
	}, ttl * 1000);
};

export const markCacheAsDirty = (key: string) => {
	if (cache.has(key)) {
		console.log(`marking key:`, key);
		const cachedData = cache.get(key);
		cachedData.dirty = true;
		cache.set(key, cachedData);
		console.log(`Marked key as dirty:`, key);
	} else {
		console.log(`Key not found to be marked:`, key);
	}
};
