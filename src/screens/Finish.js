import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium, visueltProBold } from './../utils/font';

const IMAGES = [
    require('./../assets/images/TickIcon.png')
]
export class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
    }
    componentDidMount = () => {
        this.animate()
    }
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start()
    }
    render() {
        const changeMargin = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [800, 250]
        })
        const spring = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
        return (<LinearGradient colors={['#3023AE', '#53A0FD', '#8ccc92', '#8ccc98',]} style={{ flex: 1 }} locations={[0.03, 0.6, 0.95, 1]}>
            <View>
                <Text style={{ color: '#FFFFFF', fontFamily: visueltProRegular, fontSize: 18, marginTop: 62, marginLeft: 45 }}>
                    Welcome
                    </Text>
                <Text style={{ color: '#FFFFFF', fontFamily: visueltProMedium, fontSize: 48, marginTop: 2, marginLeft: 43 }}>
                    {this.props.route.params.firstName + ' ' + this.props.route.params.lastName}
                </Text>
                <Animated.View style={{ marginTop: changeMargin, justifyContent: 'center', alignItems: 'center', transform: [{ scale: spring }] }}>
                    <View style={{ height: 100, width: 100, backgroundColor: '#FFFFFF', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={IMAGES[0]} style={{ height: 26, width: 35 }} />
                    </View>
                </Animated.View>
            </View>
        </LinearGradient>
        )
    }
}