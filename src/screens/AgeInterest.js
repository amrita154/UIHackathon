import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, TouchableHighlight, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium, visueltProBold } from './../utils/font';
import Slider from "react-native-slider";
const IMAGES = [
    require('./../assets/images/leftContainer.png'),
    require('./../assets/images/nextButton.png'),
    require('./../assets/images/backButton.png'),
    require('./../assets/images/track.png'),
]
function getAge() {
    var age = [];
    for (var i = 18; i <= 85; i++) {
        age.push(i);
    }
    return age;
}

const INTERESTS = ['choice 1', 'choice 2', 'choice 3', 'choice 4', 'choice 5', 'choice 6', 'choice 7']
const AGE = getAge();

class AgeInterest extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        console.log(props)
        this.minValue = 18
        this.maxValue = 85
        this.state = {
            selectedChoiceIndex: this.props.selectedChoiceIndex,
            age: this.props.age,
            isChoiceZero: false
        }

    }
    componentDidMount = () => {
        this.animate()
    }
    animate() {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear
            }
        ).start()
    }
    validate = () => {
        if (this.state.selectedChoiceIndex.length == 0) {
            this.setState({ isChoiceZero: true });
        }
        else {
            this.setState({ isChoiceZero: false });
        }
    }
    onClickNext = async () => {
        await this.validate()
        var data = [this.state.age, this.state.selectedChoiceIndex]
        if (!this.state.isChoiceZero) {
            const { navigation, lastName, firstName } = this.props
            navigation.navigate('Finish', { firstName: firstName, lastName: lastName })
        }
    }
    onClickPrev() {
        this.setState(() => { this.props.onClickPrev('Third') })
    }
    selectIndex = (index) => {
        if (this.state.selectedChoiceIndex.includes(index)) {
            var temp = [...this.state.selectedChoiceIndex]
            temp.splice(temp.indexOf(index), 1);
            this.setState({ selectedChoiceIndex: temp, isChoiceZero: false })
        }
        else {
            temp = [...this.state.selectedChoiceIndex]
            temp.push(index);
            this.setState({ selectedChoiceIndex: temp, isChoiceZero: false })

        }
    }
    render() {
        const changeMargin = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
        })
        return (
            <LinearGradient colors={['#F7F7F7', '#FFFFFF']} style={styles.container} locations={[0.5]}>
                <View style={styles.leftContainer}>
                    <View>
                        <Text style={{ fontSize: 18, fontFamily: visueltProRegular, marginTop: 62, color: '#818181', marginLeft: 45 }}>Registration</Text>
                        <Text style={{ fontSize: 48, fontFamily: visueltProMedium, marginTop: 2, color: '#383838', marginLeft: 43 }}>Steps</Text>
                        <View style={{ flexDirection: 'row', marginTop: 109 }}>
                            <Text style={{ marginLeft: 45, fontSize: 18, fontFamily: visueltProRegular, color: '#383838' }}>Select your age</Text>
                            <Text style={{ marginLeft: 77, fontSize: 18, fontFamily: visueltProBold, color: '#0035FF' }}>{this.state.age.toFixed(0)}</Text>
                            <Text style={{ marginLeft: 4, fontSize: 14, marginTop: 4, fontFamily: visueltProBold, color: '#0035FF' }}>YRS</Text>
                        </View>
                        <View style={{ marginLeft: 43, width: 250, marginTop: 31 }} >
                            <Slider
                                minimumTrackImage={IMAGES[3]}
                                minimumTrackTintColor='#0035FF'
                                maximumTrackTintColor='#B9B9B9'
                                maximumValue={this.maxValue}
                                minimumValue={this.minValue}
                                value={this.state.age}
                                onValueChange={(value) => {
                                    this.setState({ age: value })

                                }}
                                thumbTintColor='#0035FF'
                                trackStyle={{ height: 3 }}
                                thumbStyle={{ height: 23, width: 23, borderRadius: 15 }}
                            />
                        </View>
                        <Text style={{ marginTop: 86.25, marginLeft: 45, fontSize: 18, fontFamily: visueltProRegular, color: '#383838' }}>Choose your interest</Text>
                        <FlatList
                            data={INTERESTS}
                            style={{ marginTop: 17, marginLeft: 45, }}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                if (this.state.selectedChoiceIndex.indexOf(index) == -1) {
                                    return (
                                        <TouchableOpacity style={{ height: 35, width: 99, borderRadius: 17.5, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginRight: 15 }} activeOpacity={0.7} onPress={() => this.selectIndex(index)}>
                                            <Text style={{ color: '#383838', fontFamily: visueltProRegular, fontSize: 16 }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                else {
                                    return (
                                        <TouchableOpacity style={{ height: 35, width: 99, borderRadius: 17.5, backgroundColor: '#0035FF', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginRight: 15 }} activeOpacity={0.7} onPress={() => this.selectIndex(index)}>
                                            <Text style={{ color: '#FFFFFF', fontFamily: visueltProMedium, fontSize: 16 }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }}
                        />
                        {
                            this.state.isChoiceZero ?
                                <View style={{ marginLeft: 45, marginTop: 15 }}>
                                    <Text style={{ fontSize: 14, fontFamily: visueltProMedium, color: '#EE1F1F' }}>Select atleast one interest</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
                <View style={{ flex: 0.15 }}>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 86, marginLeft: -34 }}></View>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 170, marginLeft: -5 }}></View>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 170, marginLeft: -5 }}></View>
                    <Animated.View style={{ borderColor: '#1ACC2C', height: 21, width: 21, marginTop: 170, marginLeft: -10, borderRadius: 15, borderWidth: 2, justifyContent: 'center', alignItems: 'center', transform: [{ scale: changeMargin }] }}>
                        <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11 }}></View>
                    </Animated.View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight activeOpacity={0.7} onPress={() => { this.onClickPrev() }} underlayColor='#E2E2E2'>
                            <View style={{ borderRadius: 50, width: 78, height: 78, marginTop: 125, marginLeft: -300, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} >
                                <Image source={IMAGES[2]} style={{ height: 25, width: 25 }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onClickNext() }}>
                            <LinearGradient style={{ borderRadius: 50, width: 78, height: 78, marginTop: 125, marginLeft: -55, justifyContent: 'center', alignItems: 'center' }} colors={['#3023AE', '#53A0FD', '#6cb5ca', '#bcdcbc']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.1, 0.7, 1]} >
                                <Image source={IMAGES[1]} style={{ height: 25, width: 25 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 0.85,
        backgroundColor: 'white',
        borderTopRightRadius: 200
    }
})
export default AgeInterest;