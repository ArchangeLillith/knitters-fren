import React, { useEffect, useState } from "react";
import { Tag } from "../utils/types";
import TagButton from "./TagButton";

type TagContainerProps = {
	selectedTags: Tag[];
	setSelectedTags: React.Dispatch<React.SetStateAction<any>>;
};

const TagContainer: React.FC<TagContainerProps> = ({
	selectedTags,
	setSelectedTags,
}) => {
	const [tags, setTags] = useState<Tag[]>([]);

	useEffect(() => {
		//Refactor to see if this can grab from cached data rather than the fetched
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((error) => alert(error));
	}, []);

	const tagToggle = (tagButton: React.MouseEvent<HTMLButtonElement>) => {
		console.log(`Tag togle trigger`);
		const { id, value } = tagButton.currentTarget;
		const numericId = parseInt(id, 10);
		const updatedSelectedTags = selectedTags.some((tag) => tag.id === numericId)
			? selectedTags.filter((tag) => tag.id !== numericId)
			: [...selectedTags, { id: numericId, name: value }];
		//Yeah i could type this but it's a HUGE pain and prob not worth it
		setSelectedTags((prev) => ({
			...prev,
			selectedTags: updatedSelectedTags,
			tagsActive: updatedSelectedTags.length > 0,
		}));
	};

	return (
		<div
			id="tags-div"
			className="form-control-lg form-control flex-grow-1 bg-soft"
		>
			{tags.map((tag: Tag) => (
				<div
					className="m-1 d-inline-flex btn-group"
					role="group"
					aria-label="Basic checkbox toggle button group"
					key={`${tag.id}-container`}
				>
					<TagButton
						tag={tag}
						selectedTags={selectedTags}
						tagToggle={tagToggle}
					/>
				</div>
			))}
		</div>
	);
};

export default TagContainer;
