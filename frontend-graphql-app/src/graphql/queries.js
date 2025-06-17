import { gql } from "@apollo/client";

// GraphQL query to fetch all drivers along with their associated cars
export const GET_DRIVERS_WITH_CARS = gql`
	query GetDrivers {
		drivers {
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

// GraphQL query to fetch all cars (useful for the dropdown in the form)
export const GET_ALL_CARS = gql`
	query GetAllCars {
		cars {
			_id
			name
			model
		}
	}
`;
