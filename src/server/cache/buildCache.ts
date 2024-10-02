import { getCache, setCache } from '.';
import db from '../db';
import { PatternObjectQuery, PatternObject } from '../types';
import { transformPatternObject } from '../utils/functions';

export const buildCache = async () => {
	console.log(`Building cache....`);
	//See if any caches are dirty
	let tagCacheInvalid: boolean =
		getCache('allTags') !== null && !getCache('allTags').dirty;
	let patternCacheInvalid =
		getCache('allPatterns') !== null && !getCache('allPatterns')?.dirty;

	//If all of the caches are clean, we don't need to rebuild
	if (!tagCacheInvalid && !patternCacheInvalid) {
		console.log(`Nothing was invalid, cache is fine`);
		return null;
	}

	//If the patterns are dirty, refresh the cache. Done first as it's most likely to be dirty
	if (patternCacheInvalid || patternCacheInvalid === null) {
		const result: PatternObjectQuery[] = await db.patterns.all();
		if (result.length > 0) {
			const patternsObject: PatternObject[] = [];
			for (const patternObj of result) {
				const patternObject: PatternObject = transformPatternObject(patternObj);
				patternsObject.push(patternObject);
			}
			setCache(`allPatterns`, patternsObject);
			patternCacheInvalid = false;
		}
	}

	//If tags are dirty, refresh them. Done second because, even though there's little to no way they'll be dirty, the next process relies on the being up to date
	if (tagCacheInvalid || tagCacheInvalid === null) {
		const tags = await db.tags.all();
		setCache('allTags', tags);
		tagCacheInvalid = false;
	}
};
