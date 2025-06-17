import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import Tailwind CSS
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Create an Apollo Client instance
const client = new ApolloClient({
	uri: "http://localhost:3000/graphql", // Your NestJS GraphQL backend URI
	cache: new InMemoryCache(), // In-memory cache for Apollo Client
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			{" "}
			{/* Wrap your App with ApolloProvider */}
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
