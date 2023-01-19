import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";
import { Habit } from "../screens/Habit";


export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen
        name='home'
        component={Home}
      />
      <Screen
        name='habit'
        component={Habit}
      />
      <Screen
        name='newHabit'
        component={NewHabit}
      />
    </Navigator>
  )
}

