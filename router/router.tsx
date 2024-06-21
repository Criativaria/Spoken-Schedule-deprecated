import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesChoice } from "../components/category-choice";
import { BroadcastersChoice } from "../components/broadcast-choice";
const Stack = createNativeStackNavigator();

export function Router() {
  return (
    <Stack.Navigator initialRouteName="CategoriesChoice">
      <Stack.Screen
        name="CategoriesChoice"
        component={CategoriesChoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BroadcastersChoice"
        component={BroadcastersChoice}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
