import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator ,  DrawerItems} from 'react-navigation-drawer';
import Colors from '../constants/colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

//importing all the screens
import IncomeOverviewScreen from '../screens/IncomeOverviewScreen';
import IncomeDetailScreen from '../screens/IncomeDetailScreen';
import EditIncomeScreen from '../screens/EdittIncomeScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const InputsNavigator = createStackNavigator(
  {
    //the first screen written here is always the first screen that we see
   // Auth: AuthScreen,
    Home: HomeScreen,
    InputOverview: IncomeOverviewScreen,
    InputDetail: IncomeDetailScreen,
    AddInput: EditIncomeScreen,
    Map: MapScreen

  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

// const ExpensesNavigator = createStackNavigator(
//   {
//     //the first screen written here is always the first screen that we see
//     ExpenseOverview: ExpenseOverviewScreen,
//     //these are all the screens where we can go from the first screen
//     ExpenseDetail: ExpenseDetailScreen,
//     EditExpense: EditExpenseScreen
//   },
//   {
//     navigationOptions:
//     {
//       drawerIcon: drawerConfig =>
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.activeTintColor}
//         />
//     },
//     //styleing the default header using Platform from react-native which helps us 
//     //to choose something for Android and something else for IOS
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

//the title from the default header
// IncomeOverviewScreen.navigationOptions = {
//   headerTitle: 'All incomes'
// };

//i have to change here - this is the menu
const AddInputNavigator = createStackNavigator(
  {
    AddInput: EditIncomeScreen,

  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

//combining those 2 stack navigators in a drawer
const MainNavigator = createDrawerNavigator(
  {
    Inputs: InputsNavigator,
   
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const SensibleNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: MainNavigator
});


export default createAppContainer(SensibleNavigator);