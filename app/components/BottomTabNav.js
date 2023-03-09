import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeTab from '../tabcomponent/HomeTab';
import AddContent from '../screens/AddContent';
import ImageTab from '../tabcomponent/ImageTab';
import SearchTab from '../tabcomponent/SearchTab';
import VideoTab from '../tabcomponent/VideoTab';

import HomeSvg from './svg/HomeSvg';
import SearchBlack from './svg/SearchBlack';
import Edit from './svg/Edit';
import Panorama from './svg/Panorama';
import Movie from './svg/Movie';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const getActiveTintColor = routeName => {
    if (routeName === 'Home') {
      return '#F09090';
    } else if (routeName === 'Search') {
      return '#F5CEC7';
    } else if (routeName === 'Write') {
      return '#C6C09C';
    } else if (routeName === 'Photo') {
      return '#FFC98B';
    } else {
      return '#FFB284';
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: getActiveTintColor(route.name),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <HomeSvg color={'#F09090'} /> : <HomeSvg />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <SearchBlack color={'#F5CEC7'} /> : <SearchBlack />,
        }}
      />
      <Tab.Screen
        name="Write"
        component={AddContent}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <Edit color={'#C6C09C'} /> : <Edit />,
        }}
      />

      <Tab.Screen
        name="Photo"
        component={ImageTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <Panorama color={'#FFC98B'} /> : <Panorama />,
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <Movie color={'#FFB284'} /> : <Movie />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
