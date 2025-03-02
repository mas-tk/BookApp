// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import BookScreen from './src/screens/BookScreen';
import BookOverviewScreen from './src/screens/BookOverviewScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import RecommendScreen from './src/screens/RecommendScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import type { RootStackParamList } from './src/types/navigation';

/*
  ----------------------------
  1. HomeStackNavigator
  ----------------------------
  HomeStackNavigator は「えほん」タブで利用するスタックナビゲーションです。
  ・HomeScreen：絵本一覧画面
  ・BookScreen：実際に絵本を読む画面
  ・BookOverviewScreen：本の概要を表示する画面
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

// App.tsx（抜粋）
function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '絵本一覧' }}
      />
      <Stack.Screen
        name="Book"
        component={BookScreen}
        // ここでヘッダーを隠す
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookOverview"
        component={BookOverviewScreen}
        options={{ title: '本の概要' }}
      />
    </Stack.Navigator>
  );
}


/*
  ----------------------------
  2. BottomTabNavigator
  ----------------------------
  BottomTabNavigator は、画面下部にタブメニューを表示し、
  ・えほん（HomeStackNavigator）
  ・マイページ
  ・おすすめ
  ・設定
  の4つのタブに切り替えられるようにします。
*/
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'えほん',
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            tabBarLabel: 'マイページ',
          }}
        />
        <Tab.Screen
          name="Recommend"
          component={RecommendScreen}
          options={{
            tabBarLabel: 'おすすめ',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: '設定',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
