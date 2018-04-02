/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
type Props = {};
export default class SecondPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    this._goFirstPage()
                }}>
                    <Text style={styles.testStyle}>
                            点我返回第一页:{this.props.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _goFirstPage(){
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#af6',
        flex:1
    },
    testStyle:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:25,
        marginTop:80
    }
});
