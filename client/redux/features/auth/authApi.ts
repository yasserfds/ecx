// Import the base `apiSlice` and `userRegistration` action.
import { apiSlice } from "../api/apiSlice"; // Adjust this path based on your project structure.
import { userRegistration } from "./authSlice"; // Adjust this path based on your project structure.

// Define types for the registration and activation endpoints
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

type ActivationData = {
  activation_token: string;
  activation_code: string;
};

// Inject the `authApi` endpoints into the existing `apiSlice`.
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the `register` mutation endpoint.
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration", // Ensure this endpoint matches your backend route.
        method: "POST",
        body: data,
        credentials: "include", // Ensures cookies are included in the request if needed.
      }),
      // Handle side effects or state updates after a successful registration.
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled; // Await the query to get the result data.
          // Dispatch the `userRegistration` action with the activation token.
          dispatch(
            userRegistration({
              token: data.activationToken,
            })
          );
        } catch (error) {
          // Handle errors appropriately.
          console.error("Registration failed:", error);
        }
      },
    }),

    // Define the `activation` mutation endpoint.
    activation: builder.mutation<void, ActivationData>({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user", // Ensure this endpoint matches your backend route.
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
  }),
  overrideExisting: false, // Optional: prevents overwriting existing endpoints.
});

// Export hooks for the endpoints defined in `authApi`.
export const { useRegisterMutation, useActivationMutation } = authApi;
