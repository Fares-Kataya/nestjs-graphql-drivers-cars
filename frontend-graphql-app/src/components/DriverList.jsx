import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DRIVERS_WITH_CARS } from "../graphql/queries";

// DriverList component to display all drivers and their cars
const DriverList = () => {
	// Use the useQuery hook to fetch data from the GraphQL endpoint
	// 'data' will contain the result, 'loading' indicates if the query is in progress,
	// and 'error' will contain any errors.
	const { loading, error, data } = useQuery(GET_DRIVERS_WITH_CARS);

	if (loading)
		return <p className="text-center py-4 text-gray-600">Loading drivers...</p>;
	if (error)
		return (
			<p className="text-center py-4 text-red-500">Error: {error.message}</p>
		);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				All Drivers & Their Cars
			</h2>
			{data.drivers.length === 0 ? (
				<p className="text-center text-gray-500">
					No drivers found. Add some drivers and cars!
				</p>
			) : (
				<div className="space-y-6">
					{data.drivers.map((driver) => (
						<div
							key={driver._id}
							className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
							<h3 className="text-xl font-semibold text-gray-700 mb-2">
								{driver.name} (Age: {driver.age})
							</h3>
							{driver.cars && driver.cars.length > 0 ? (
								<ul className="list-disc list-inside space-y-1 pl-4">
									<p className="font-medium text-gray-600 mb-1">Cars:</p>
									{driver.cars.map((car) => (
										<li key={car._id} className="text-gray-600">
											{car.name} ({car.model})
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500 italic">
									No cars assigned to this driver.
								</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DriverList;
