import React from "react";
import DriverList from "./components/DriverList";
import AddCarForm from "./components/AddCarForm";

function App() {
	return (
		<div className="min-h-screen bg-gray-100 py-6">
			<header className="text-center py-6">
				<h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
					GraphQL Driver & Car Management
				</h1>
				<p className="mt-2 text-lg text-gray-600">
					NestJS Backend with React Frontend
				</p>
			</header>
			<main className="container mx-auto px-4">
				{/* The form for adding cars and drivers */}
				<AddCarForm />
				{/* The list of drivers and their assigned cars */}
				<DriverList />
			</main>
		</div>
	);
}

export default App;
