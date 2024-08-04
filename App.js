import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router/router";
import { View } from "react-native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
}
