import { gql } from "@apollo/client";

// GraphQL mutation to add a car to a driver
export const ADD_CAR_TO_DRIVER = gql`
	mutation AddCarToDriver($driverId: ID!, $carId: ID!) {
		addCarToDriver(driverId: $driverId, carId: $carId) {
			_id
			name
			age
			cars {
				_id
				name
				model
			}
		}
	}
`;

// GraphQL mutation to create a new car (BONUS for form flexibility)
export const CREATE_CAR = gql`
	mutation CreateCar($name: String!, $model: String!) {
		createCar(createCarInput: { name: $name, model: $model }) {
			_id
			name
			model
		}
	}
`;

// GraphQL mutation to create a new driver (BONUS for form flexibility)
export const CREATE_DRIVER = gql`
	mutation CreateDriver($name: String!, $age: Int!) {
		createDriver(createDriverInput: { name: $name, age: $age }) {
			_id
			name
			age
		}
	}
`;
