import { getCache, setCache } from '.';
import db from '../db';
import { PatternTag } from '../types';

export const buildCache = async () => {
	console.log(`Building cache....`);
	//See if any caches are dirty
	let tagCacheValid: boolean =
		getCache('allTags') !== null && !getCache('allTags').dirty;
	let patternCacheValid =
		getCache('allPatterns') !== null && !getCache('allPatterns')?.dirty;
	let patternTagsCacheValid =
		getCache('patternTags') !== null && !getCache('patternTags')?.dirty;
	let pattern_tags: PatternTag[] = [];

	//If all of the caches are clean, we don't need to rebuild
	if (!tagCacheValid && !patternCacheValid && !patternTagsCacheValid) {
		console.log(`Nothing was invalid, cache is fine`);
		return null;
	}

	//If the patterns are dirty, refresh the cache. Done first as it's most likely to be dirty
	if (patternCacheValid || patternCacheValid === null) {
		const patterns = await db.patterns.all();
		setCache('allPatterns', patterns);
		patternCacheValid = false;
	}

	//If tags are dirty, refresh them. Done second because, even though there's little to no way they'll be dirty, the next process relies on the being up to date
	if (tagCacheValid || tagCacheValid === null) {
		const tags = await db.tags.all();
		setCache('allTags', tags);
		tagCacheValid = false;
	}

	//If the patternTags are dirty, we rebuild the patternTags cache
	//*Keep in mind, the structure of our cache is different than our database for ease of searching, see the txt file for the cache structure
	if (patternTagsCacheValid || patternTagsCacheValid === null) {
		//Get the patern tags table
		pattern_tags = await db.pattern_tags.all();
		//make a set for the unique patern_ids within the table
		const pattern_ids = new Set<string>();
		for (const entry of pattern_tags) {
			pattern_ids.add(entry.pattern_id);
		}

		const patternToTagsMap: { [key: string]: number[] } = {};
		for (const pattern_id of pattern_ids) {
			//initiate an empty array at the index of the pattern_id
			patternToTagsMap[pattern_id] = [];

			for (const row of pattern_tags) {
				if (row.pattern_id === pattern_id) {
					patternToTagsMap[pattern_id].push(row.tag_id);
				}
			}
		}
		patternTagsCacheValid = false;
		console.log(`Should be the pattern tags map from cache:`, patternToTagsMap);
	}
};
