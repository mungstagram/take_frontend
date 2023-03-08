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
        name="Search"
        component={SearchTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <SearchBlack />,
        }}
      />
      <Tab.Screen
        name="Write "
        component={AddContent}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <Edit />,
        }}
      />
      <Tab.Screen
        name="Photo"
        component={ImageTab}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <Panorama />,
        }}
      />
      <Tab.Screen
        name="Video"
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
