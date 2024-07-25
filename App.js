import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router/router";
import { ClearAll } from "./src/async-storage/favorites-programs-storage";


export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
}
