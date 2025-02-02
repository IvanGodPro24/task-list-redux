import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice";
import filterReducer from "./filtersSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  //   reducer: rootReducer,
  reducer: {
    tasks: persistedReducer,
    filters: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// const initialState = {
//   tasks: {
//     items: [
//       { id: 0, text: "Learn HTML and CSS", completed: true },
//       { id: 1, text: "Get good at JavaScript", completed: true },
//       { id: 2, text: "Master React", completed: false },
//       { id: 3, text: "Discover Redux", completed: false },
//       { id: 4, text: "Build amazing apps", completed: false },
//     ],
//   },
//   filters: {
//     status: "all",
//   },
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "tasks/addTask":
//       return {
//         ...state,
//         tasks: {
//           items: [...state.tasks.items, action.payload],
//         },
//       };

//     case "tasks/deleteTask":
//       return {
//         ...state,
//         tasks: {
//           items: state.tasks.items.filter((task) => task.id !== action.payload),
//         },
//       };

//     case "tasks/toggleCompleted":
//       return {
//         ...state,
//         tasks: {
//           items: state.tasks.items.map((task) => {
//             if (task.id !== action.payload) {
//               return task;
//             }

//             return {
//               ...task,
//               completed: !task.completed,
//             };
//           }),
//         },
//       };

//     case "tasks/setStatusFilter":
//       return {
//         ...state,
//         filters: {
//           status: action.payload,
//         },
//       };

//     default:
//       return state;
//   }
// };
