import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProgramsChoice } from "../pages/programs-choice";
import { BroadcastersChoice } from "../pages/broadcast-choice";
import { CategoriesChoice } from "../pages/category-choice";

const Stack = createNativeStackNavigator();

export function Router() {
  return (
    <Stack.Navigator initialRouteName="CategoriesChoice">
      <Stack.Screen
        name="CategoriesChoice"
        component={CategoriesChoice}
        options={{ headerShown: false }}
        //sempre deixa esse headerShown: false pq se nao fica uma header feia na pagina
      />
      <Stack.Screen
        name="BroadcastersChoice"
        component={BroadcastersChoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProgramsChoice"
        component={ProgramsChoice}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
