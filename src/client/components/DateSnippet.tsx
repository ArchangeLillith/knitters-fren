/* eslint-disable react/no-unescaped-entities */
import dayjs from 'dayjs';
import React from 'react';

const DateSnippet = createdAt => {
	return <small>{dayjs(createdAt).format('MMMM D, YYYY h:mm A')}</small>;
};

export default DateSnippet;
