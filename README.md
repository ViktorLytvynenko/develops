Project is a web application developed with Next.js, Redux Toolkit, Redux-Thunk and Tailwind CSS.

The base URL for the instance is stored in the environment variable, so please make sure to specify it during deployment
or when running locally.

For running locally use npm run dev.
For deploying use npm run build.

State Management with Redux Toolkit:
CarSlice: Manages the state related to cars.
State: Includes data (all cars), loading (loading state), error (error message), and filteredData (filtered results).
Reducers: getData for fetching all cars and getFilteredData for filtering cars based on type and year.

Async Actions:
getData: Uses createAsyncThunk to fetch all cars from the API. Handles loading and error states.
getFilteredData: Fetches cars based on selected type and year from the API.

Extra Reducers:
Handles different states (pending, fulfilled, rejected) for both getData and getFilteredData actions to update the Redux
store accordingly.

Included:
.eslintrc.json
.prettierrc
