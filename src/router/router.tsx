import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProgramsChoice } from "../pages/programs-choice";
import { ChannelChoice } from "../pages/channel-choice";
import { CategoriesChoice } from "../pages/category-choice";

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
        component={ChannelChoice}
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
