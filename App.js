import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./Redux/index";
import thunk from "redux-thunk";
import PhotosList from "./Components/PhotosList";
import PhotoPage from "./Components/PhotoPage";

let store = createStore(reducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="PhotosList"
            component={PhotosList}
            options={{ title: "Home page" }}
          />
          <Stack.Screen
            name="PhotoPage"
            component={PhotoPage}
            options={{ title: "Photo page" }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
