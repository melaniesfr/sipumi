import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login, Register, Splash } from '../components/primary';
import { BerandaMenuVisitor, KategoriMenuVisitor, PengaturanMenuVisitor } from '../components/visitor';
import { BerandaMenuUser, KategoriMenuUser, ProfilMenuUser, PengaturanMenuUser } from '../components/user';
import { BerandaMenuAdmin, KategoriMenuAdmin, TambahMenuAdmin, ProfilMenuAdmin, PengaturanMenuAdmin } from '../components/admin';
import { BottomNavigatorVisitor } from '../components/visitor/navigator';
import { BottomNavigatorUser } from '../components/user/navigator';
import { BottomNavigatorAdmin } from '../components/admin/navigator';
import { colors } from '../utils';
import AuthContext from '../components/primary/Auth';

// ===========================================================================================

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function VisitorTabScreen() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigatorVisitor { ...props } />}>
      <Tab.Screen name="Beranda" component={ BerandaMenuVisitor } />
      <Tab.Screen name="Kategori" component={ KategoriMenuVisitor } />
      <Tab.Screen name="Pengaturan" component={ PengaturanMenuVisitor } />
    </Tab.Navigator>
  );
};

// ===========================================================================================

function UserTabScreen() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigatorUser { ...props } />}>
      <Tab.Screen name="Beranda" component={ BerandaMenuUser } />
      <Tab.Screen name="Kategori" component={ KategoriMenuUser } />
      <Tab.Screen name="Profil" component={ ProfilMenuUser } />
      <Tab.Screen name="Pengaturan" component={ PengaturanMenuUser } />
    </Tab.Navigator>
  );
};

// ===========================================================================================

function AdminTabScreen() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigatorAdmin { ...props } />}>
      <Tab.Screen name="Beranda" component={ BerandaMenuAdmin } />
      <Tab.Screen name="Kategori" component={ KategoriMenuAdmin } />
      <Tab.Screen name="Tambah" component={ TambahMenuAdmin } />
      <Tab.Screen name="Profil" component={ ProfilMenuAdmin } />
      <Tab.Screen name="Pengaturan" component={ PengaturanMenuAdmin } />
    </Tab.Navigator>
  );
};

// ===========================================================================================

function RootScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={ Splash }
        options={({ navigation, route }) => ({
          title: 'Splash Screen',
          headerShown: false
        })}
      />
      <Stack.Screen name="Login" component={ Login }
        options={({ navigation, route }) => ({
          title: 'Page Login',
          headerShown: false
        })}
      />
      <Stack.Screen name="Register" component={ Register }
        options={({ navigation, route }) => ({
          title: 'Page Register',
          headerShown: false
        })}
      />
      <Stack.Screen name="VisitorScreen" component={ VisitorTabScreen }
        options={{
          title: 'Visitor Screen',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

// ===========================================================================================

export default function RootStack() {
  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false
        };
    }
  };

  const [ loginState, dispatch ] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const email = foundUser[0].email;

      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', id: email, token: userToken })
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'LOGOUT' })
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.grey} />
      </View>
    );
  }

  const roleLogged = () => {
    if (loginState.userToken === 'adminToken') {
      return (
        <Stack.Navigator>
          <Stack.Screen name="AdminScreen" component={ AdminTabScreen }
            options={{
              title: 'Admin Screen',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      );
    } if (loginState.userToken === 'userToken') {
      return (
        <Stack.Navigator>
          <Stack.Screen name="UserScreen" component={ UserTabScreen }
            options={{
              title: 'User Screen',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      );
    } if (loginState.userToken === null) {
      return <RootScreen />;
    }
  }

  return (
    <AuthContext.Provider value={ authContext }>
      { roleLogged() }
    </AuthContext.Provider>
  );
};