/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const {
    width,
    height
} = Dimensions.get('window');
import {Navigator} from 'react-native-deprecated-custom-components'
import FirstPage from './FirstPage';
import SecondPage from "./SecondPage";

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <Navigator
                initialRoute={{
                    title: '第一页',
                    name: 'FirstPage',    // 名称
                    component: FirstPage,  // 要跳转的板块
                    passProps: {
                        name: '参数1'
                    }
                }}
                configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
                renderScene={(route, navigator) => {    // 将板块生成具体的组件
                    let Component = route.component;    // 获取路由内的板块
                    return <Component {...route.passProps} navigator={navigator}
                    />
                }}
                navigationBar={    // 如果需要导航栏是需要重写的
                    <Navigator.NavigationBar
                        style={styles.navBar}
                        routeMapper={this.NavigationBarRouteMapper}
                    />
                }
            />
        );
    }

    NavigationBarRouteMapper = {
        //左边Button
        LeftButton: (route, navigator, index, navState)=> {
            if (route.title  === '第一页') {
                return null;
            }
            return (
                <TouchableOpacity
                    onPress={() => navigator.pop()}
                    style={styles.navBarLeftButton}>
                    {/*这里可以用图标代替*/}
                    <Text style={styles.navBarButtonText}>
                       back
                    </Text>
                </TouchableOpacity>
            );
        },
        //右边Button
        RightButton: (route, navigator, index, navState)=> {
            if (route.title === '第二页') {
                return null;
            }
            return (
                <TouchableOpacity
                    onPress={() => navigator.push({
                        component: SecondPage,//跳转页面
                        title: '第二页',
                        passProps:{
                            name:'zx'
                        }
                    })}
                    style={styles.navBarRightButton}>
                    {/*这里可以用图标代替*/}
                    <Text style={styles.navBarButtonText}>
                        Next
                    </Text>
                </TouchableOpacity>
            );
        },
        //标题
        Title: (route, navigator, index, navState)=> {
            return (
                <Text style={styles.navBarTitleText}>
                    {route.title}
                </Text>
            );
        },
    };

}
const styles=StyleSheet.create({
    navBar: {
        backgroundColor: 'white',
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarTitleText: {
        color: '#373E4D',
        fontWeight: '500',
        marginVertical: 15,
        marginLeft:width*0.23,
        fontSize: 16,
    },
    navBarRightButton: {
        paddingRight: 10,
    },

    navBarButtonText: {
        color: '#5890FF',
        fontSize: 16,
        marginVertical: 15,
    },
});
