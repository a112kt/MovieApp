import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from  './../screens/Home'
import MovieScreen from "../screens/MovieScreen";
import Person from "../screens/Person";
import Search from "../screens/Search";
import Info from "../screens/Info";
import SeeAll from "../screens/SeeAll";


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Movie" component={MovieScreen} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Person" component={Person} options={{
          headerShown: false,
        }}/>

         <Stack.Screen name="Search" component={Search} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Info" component={Info} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="SeeAll" component={SeeAll} options={{
          headerShown: false,
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}







