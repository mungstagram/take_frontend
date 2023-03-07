import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import HomeTab from '../tabcomponent/HomeTab';
import AddContent from '../screens/AddContent';
import ImageTab from '../tabcomponent/ImageTab';
import SearchTab from '../tabcomponent/SearchTab';
import VideoTab from '../tabcomponent/VideoTab';

import {SvgUri} from 'react-native-svg';
import HomeSvg from './svg/HomeSvg';
import SearchBlack from './svg/SearchBlack';
import WriteComment from './svg/WriteComment';
import Panorama from './svg/Panorama';
import Movie from './svg/Movie';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#F09090', // 선택된 탭의 아이콘 색상
        inactiveTintColor: '#000000', // 선택되지 않은 탭의 아이콘 색상
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <HomeSvg />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <SearchBlack />,
        }}
      />
      <Tab.Screen
        name="AddContent "
        component={AddContent}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <WriteComment />,
        }}
      />
      <Tab.Screen
        name="ImageTab"
        component={ImageTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <Panorama />,
        }}
      />
      <Tab.Screen
        name="VideoTab"
        component={VideoTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <Movie />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
