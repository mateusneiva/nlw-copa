import { Platform } from 'react-native'
import { Box, useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { CreateScreen, FindScreen, PollDetailsScreen, PollsScreen } from '../screens'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="home" component={PollRoutes} />
      <Stack.Screen name="find" component={FindScreen} />
      <Stack.Screen name="details" component={PollDetailsScreen} />
    </Stack.Navigator>
  )
}

function PollRoutes() {
  const { colors, sizes } = useTheme()

  const tabIconSize = sizes[6]

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',

        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          height: 68,
          borderTopWidth: 0,
          paddingHorizontal: 30,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -1 : 0,
        },
      }}
    >
      <Tab.Screen
        name="polls"
        component={PollsScreen}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={tabIconSize} />,
          tabBarLabel: 'Meus bolões',
        }}
      />

      <Tab.Screen
        name="new"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={tabIconSize} />,
          tabBarLabel: 'Novo bolão',
        }}
      />
    </Tab.Navigator>
  )
}
