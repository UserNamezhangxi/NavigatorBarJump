/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import  SecondPage from './SecondPage';
type Props = {};
export default class FirstPage extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>{
                        this._goSecondPage();
                    }}
                >
                    <Text style={styles.testStyle}>
                        click to second Page:{this.props.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    /*页面内跳转*/
    _goSecondPage(){
        this.props.navigator.push({
            component: SecondPage,//跳转页面
            title: '第二页',
            passProps:{
                name:'参数'//传递参数[key,value]
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'green'
    },

    testStyle:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:25,
        marginTop:80
    }
});
