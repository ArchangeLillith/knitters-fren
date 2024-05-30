//npm run dev to start the project in dev mode
//server on 3000
//frontend on 8000

import React, { useState, useEffect } from "react";

interface AppProps {}

const App = (props: AppProps) => {
	const [data, setData] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/api/hello")
			.then((res) => res.json())
			.then((data) => setData(data.message))
			.catch((e) => console.log("[fetch erorr]", e));
	}, []);

	return (
		<div className="mx-auto mt-5 w-25">
			<div className="alert alert-info text-center">Hello {data}</div>
		</div>
	);
};

export default App;
