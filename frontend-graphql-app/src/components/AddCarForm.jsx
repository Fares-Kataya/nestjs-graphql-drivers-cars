import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CARS, GET_DRIVERS_WITH_CARS } from "../graphql/queries";
import {
	ADD_CAR_TO_DRIVER,
	CREATE_CAR,
	CREATE_DRIVER,
} from "../graphql/mutations";

// AddCarForm component to handle car and driver creation/assignment
const AddCarForm = () => {
	const [carName, setCarName] = useState("");
	const [carModel, setCarModel] = useState("");
	const [driverName, setDriverName] = useState("");
	const [driverAge, setDriverAge] = useState("");
	const [selectedDriverId, setSelectedDriverId] = useState("");
	const [selectedCarId, setSelectedCarId] = useState("");
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState(""); // 'success' or 'error'

	// Query to get all cars for the dropdown
	const {
		data: carsData,
		loading: carsLoading,
		error: carsError,
		refetch: refetchCars,
	} = useQuery(GET_ALL_CARS);

	// Query to get all drivers for the dropdown (and to re-fetch after mutations)
	const {
		data: driversData,
		loading: driversLoading,
		error: driversError,
		refetch: refetchDrivers,
	} = useQuery(GET_DRIVERS_WITH_CARS);

	// Mutation to add a car to a driver
	const [addCarToDriver] = useMutation(ADD_CAR_TO_DRIVER, {
		// refetchQueries will re-run the GET_DRIVERS_WITH_CARS query after this mutation completes
		refetchQueries: [{ query: GET_DRIVERS_WITH_CARS }],
		onCompleted: () => {
			setMessage("Car successfully assigned to driver!");
			setMessageType("success");
			setSelectedCarId("");
			setSelectedDriverId("");
		},
		onError: (err) => {
			setMessage(`Error assigning car: ${err.message}`);
			setMessageType("error");
		},
	});

	// Mutation to create a new car
	const [createCar] = useMutation(CREATE_CAR, {
		onCompleted: () => {
			setMessage("Car created successfully!");
			setMessageType("success");
			setCarName("");
			setCarModel("");
			refetchCars(); // Refetch cars to update the dropdown
		},
		onError: (err) => {
			setMessage(`Error creating car: ${err.message}`);
			setMessageType("error");
		},
	});

	// Mutation to create a new driver
	const [createDriver] = useMutation(CREATE_DRIVER, {
		onCompleted: () => {
			setMessage("Driver created successfully!");
			setMessageType("success");
			setDriverName("");
			setDriverAge("");
			refetchDrivers(); // Refetch drivers to update the dropdown
		},
		onError: (err) => {
			setMessage(`Error creating driver: ${err.message}`);
			setMessageType("error");
		},
	});

	// Handle form submission for assigning a car to a driver
	const handleAddCarToDriver = async (e) => {
		e.preventDefault();
		if (!selectedDriverId || !selectedCarId) {
			setMessage("Please select both a driver and a car.");
			setMessageType("error");
			return;
		}
		await addCarToDriver({
			variables: { driverId: selectedDriverId, carId: selectedCarId },
		});
	};

	// Handle form submission for creating a new car
	const handleCreateCar = async (e) => {
		e.preventDefault();
		if (!carName || !carModel) {
			setMessage("Please enter both car name and model.");
			setMessageType("error");
			return;
		}
		await createCar({ variables: { name: carName, model: carModel } });
	};

	// Handle form submission for creating a new driver
	const handleCreateDriver = async (e) => {
		e.preventDefault();
		const age = parseInt(driverAge, 10);
		if (!driverName || isNaN(age) || age < 18) {
			setMessage("Please enter a valid driver name and age (must be 18+).");
			setMessageType("error");
			return;
		}
		await createDriver({ variables: { name: driverName, age: age } });
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				Manage Drivers & Cars
			</h2>

			{message && (
				<div
					className={`p-3 mb-4 rounded-md text-sm ${
						messageType === "success"
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
					role="alert">
					{message}
				</div>
			)}

			{/* Form to Create a New Driver */}
			<div className="border border-gray-200 p-4 rounded-lg mb-6 shadow-sm">
				<h3 className="text-xl font-semibold text-gray-700 mb-4">
					Create New Driver
				</h3>
				<form onSubmit={handleCreateDriver} className="space-y-4">
					<div>
						<label
							htmlFor="driverName"
							className="block text-sm font-medium text-gray-700">
							Driver Name:
						</label>
						<input
							type="text"
							id="driverName"
							value={driverName}
							onChange={(e) => setDriverName(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="e.g., Jane Doe"
						/>
					</div>
					<div>
						<label
							htmlFor="driverAge"
							className="block text-sm font-medium text-gray-700">
							Driver Age:
						</label>
						<input
							type="number"
							id="driverAge"
							value={driverAge}
							onChange={(e) => setDriverAge(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="e.g., 28"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
						Create Driver
					</button>
				</form>
			</div>

			{/* Form to Create a New Car */}
			<div className="border border-gray-200 p-4 rounded-lg mb-6 shadow-sm">
				<h3 className="text-xl font-semibold text-gray-700 mb-4">
					Create New Car
				</h3>
				<form onSubmit={handleCreateCar} className="space-y-4">
					<div>
						<label
							htmlFor="carName"
							className="block text-sm font-medium text-gray-700">
							Car Name:
						</label>
						<input
							type="text"
							id="carName"
							value={carName}
							onChange={(e) => setCarName(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="e.g., Tesla"
						/>
					</div>
					<div>
						<label
							htmlFor="carModel"
							className="block text-sm font-medium text-gray-700">
							Car Model:
						</label>
						<input
							type="text"
							id="carModel"
							value={carModel}
							onChange={(e) => setCarModel(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="e.g., Model 3"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
						Create Car
					</button>
				</form>
			</div>

			{/* Form to Assign Existing Car to Existing Driver */}
			<div className="border border-gray-200 p-4 rounded-lg shadow-sm">
				<h3 className="text-xl font-semibold text-gray-700 mb-4">
					Assign Car to Driver
				</h3>
				<form onSubmit={handleAddCarToDriver} className="space-y-4">
					<div>
						<label
							htmlFor="driverSelect"
							className="block text-sm font-medium text-gray-700">
							Select Driver:
						</label>
						{driversLoading ? (
							<p className="text-gray-500">Loading drivers...</p>
						) : driversError ? (
							<p className="text-red-500">
								Error loading drivers: {driversError.message}
							</p>
						) : (
							<select
								id="driverSelect"
								value={selectedDriverId}
								onChange={(e) => setSelectedDriverId(e.target.value)}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2">
								<option value="">-- Select a Driver --</option>
								{driversData?.drivers.map((driver) => (
									<option key={driver._id} value={driver._id}>
										{driver.name}
									</option>
								))}
							</select>
						)}
					</div>
					<div>
						<label
							htmlFor="carSelect"
							className="block text-sm font-medium text-gray-700">
							Select Car:
						</label>
						{carsLoading ? (
							<p className="text-gray-500">Loading cars...</p>
						) : carsError ? (
							<p className="text-red-500">
								Error loading cars: {carsError.message}
							</p>
						) : (
							<select
								id="carSelect"
								value={selectedCarId}
								onChange={(e) => setSelectedCarId(e.target.value)}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2">
								<option value="">-- Select a Car --</option>
								{carsData?.cars.map((car) => (
									<option key={car._id} value={car._id}>
										{car.name} ({car.model})
									</option>
								))}
							</select>
						)}
					</div>
					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
						Assign Car
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddCarForm;
