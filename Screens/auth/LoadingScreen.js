import React, { useEffect, Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'
const LoadingScreen = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId)
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
           // console.log(userData);
            if (!userData) {
                props.navigation.navigate('Login');
                return;
            }
            props.navigation.navigate('Dashboard');
        }
        tryLogin();

    }, [dispatch]);

    let checkifLoggedIn = () => {
        // firebase.auth().onAuthStateChanged(
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                props.navigation.navigate('Login');
            }
            else {
                props.navigation.navigate('Dashboard');
            }
        });
    }

    return (
        <View>
            <StatusBar />
            <ActivityIndicator size="large" color='green' />
        </View>
    );
}

// class LoadingScreen extends Component {
//     componentDidMount() {
//       this.checkIfLoggedIn();
//     }

//     checkIfLoggedIn = () => {
//       firebase.auth().onAuthStateChanged(
//         function(user) {
//           console.log('AUTH STATE CHANGED CALLED ')
//           if(!user)
//             {
//                 this.props.navigation.navigate('Login');
//             }
//             else{
//                 this.props.navigation.navigate('Dashboard');
//             }
//         }.bind(this)
//       );
//     };

//     render() {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
//   }
// export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default LoadingScreen;