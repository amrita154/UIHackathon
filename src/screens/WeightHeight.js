import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, TouchableHighlight, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium, visueltProBold } from './../utils/font';

const IMAGES = [
    require('./../assets/images/leftContainer.png'),
    require('./../assets/images/nextButton.png'),
    require('./../assets/images/backButton.png'),
    require('./../assets/images/maleSelectedIcon.png'),
    require('./../assets/images/femaleUnselectedIcon.png'),
    require('./../assets/images/femaleSelectedIcon.png'),
    require('./../assets/images/maleUnselectedIcon.png'),
]
var weight = [];
var height = [];
class WeightHeight extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.state = {
            isFemaleSelected: this.props.isFemaleSelected,
            weight: [],
            height: [],
            selectedWeight: this.props.selectedWeight,
            selectedWeightIndex: this.props.selectedWeightIndex,
            selectedHeight: this.props.selectedHeight,
            selectedHeightIndex: this.props.selectedHeightIndex,
            isWeightZero: false,
            isHeightZero: false,
        }
    }
    componentDidMount = async () => {
        var i;
        for (i = 30; i <= 180; i++) {
            await weight.push(i);
        }
        for (i = 4; i <= 8; i += 0.1) {
            await height.push(i);
        }
        console.log(height)
        this.setState({ weight: weight })
        this.setState({ height: height })
        this.animate()
    }
    validate = () => {
        if (this.state.selectedWeight == 0) {
            this.setState({ isWeightZero: true })
        }
        else {
            this.setState({ isWeightZero: false })
        }
        if (this.state.selectedHeight == 0) {
            this.setState({ isHeightZero: true })
        }
        else {
            this.setState({ isHeightZero: false })
        }
    }
    onClickNext = async () => {
        await this.validate();
        if (!this.state.isHeightZero && !this.state.isWeightZero) {
            var data = [this.state.isFemaleSelected, this.state.selectedWeight, this.state.selectedHeight, this.state.selectedWeightIndex, this.state.selectedHeightIndex];
            this.setState(() => { this.props.onClickNext('Fourth', data) })
        }
    }
    onClickPrev = () => {
        this.setState(() => { this.props.onClickPrev('Second') })
    }
    getItemLayout = (data, index) => (
        { length: this.state.selectedWeightIndex == -1 ? 15 : this.state.selectedWeightIndex / 2, offset: (this.state.selectedWeightIndex == -1 ? 15 : this.state.selectedWeightIndex / 2) * index, index }
    )
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
                        {
                            !this.state.isFemaleSelected
                                ?
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 90, width: 135, marginTop: 96, borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: '#0035FF', zIndex: 5 }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ isFemaleSelected: false }) }}>
                                            <Image source={IMAGES[3]} style={{ height: 36, width: 28, marginTop: 25, marginLeft: 58 }} />
                                            <Text style={{ fontSize: 14, fontFamily: visueltProMedium, color: '#FFFFFF', marginTop: 4, marginLeft: 57 }}>Male</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 90, width: 231, marginTop: 96, borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: '#F2F5FF', marginLeft: -116 }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ isFemaleSelected: true }) }}>
                                            <Image source={IMAGES[4]} style={{ height: 36, width: 28, marginTop: 26.5, marginLeft: 149 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 90, width: 135, marginTop: 96, borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: '#F2F5FF', zIndex: 5 }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ isFemaleSelected: false }) }}>
                                            <Image source={IMAGES[6]} style={{ height: 36, width: 28, marginTop: 26.5, marginLeft: 58 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 90, width: 231, marginTop: 96, borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: '#0035FF', marginLeft: -116 }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ isFemaleSelected: true }) }}>
                                            <Image source={IMAGES[5]} style={{ height: 36, width: 28, marginTop: 25, marginLeft: 148 }} />
                                            <Text style={{ fontSize: 14, fontFamily: visueltProMedium, color: '#FFFFFF', marginTop: 4, marginLeft: 141 }}>Female</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                        <View style={{ flexDirection: 'row', marginTop: 53 }}>
                            <Text style={{ marginLeft: 45, fontSize: 18, fontFamily: visueltProRegular, color: '#383838' }}>Weight</Text>
                            <Text style={{ marginLeft: 160, fontSize: 18, fontFamily: visueltProBold, color: '#0035FF' }}>{this.state.selectedWeight}</Text>
                            <Text style={{ marginLeft: 4, fontSize: 14, marginTop: 3, fontFamily: visueltProBold, color: '#0035FF' }}>KG</Text>
                        </View>
                        <View style={{ width: 251, height: 1, backgroundColor: '#B9B9B9', marginTop: 22.75, marginLeft: 44.5 }}></View>
                        <FlatList
                            data={this.state.weight}
                            initialNumToRender={30}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            // initialScrollIndex={this.state.selectedWeightIndex == -1 ? 15 : (this.state.selectedWeightIndex / 2)}
                            //getItemLayout={this.getItemLayout}
                            style={{ marginLeft: 45, width: 245 }}
                            renderItem={({ item, index }) => {
                                if (item % 5 == 0) {
                                    return (
                                        <View>
                                            {
                                                index == this.state.selectedWeightIndex
                                                    ?
                                                    <View style={{ marginTop: 1, marginRight: item >= 100 ? -1 : 1, marginLeft: index == 0 ? 7 : 0 }}>

                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index, isWeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', borderWidth: 2.5, borderColor: '#0035FF', marginLeft: -3 }}></View>
                                                            <View style={{
                                                                height: 5, width: 15, backgroundColor: '#0035FF', borderRadius: 5, marginLeft: -8
                                                            }}></View>
                                                            <Text style={{ marginLeft: -7, marginTop: 5, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={{ marginTop: 3, marginRight: item >= 100 ? -1 : 1, marginLeft: index == 0 ? 7 : 0 }}>

                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index, isWeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9' }}></View>
                                                            <Text style={{ marginLeft: -7, marginTop: 9, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>
                                    )
                                }
                                else {
                                    return (
                                        <View>
                                            {
                                                index == this.state.selectedWeightIndex
                                                    ?
                                                    <View style={{ marginTop: 1 }}>
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index, isWeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', marginRight: 7, borderWidth: 2.5, borderColor: '#0035FF' }}></View>
                                                            <View style={{
                                                                height: 5, width: 15, backgroundColor: '#0035FF', borderRadius: 5, marginLeft: -5
                                                            }}></View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={{ marginTop: 3 }}>
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index, isWeightZero: false }) }}>
                                                            <View style={{ height: 11, width: 1, backgroundColor: '#B9B9B9', marginRight: 9 }}></View>
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>
                                    )
                                }
                            }}
                        />
                        {
                            this.state.isWeightZero ?
                                <View style={{ marginLeft: 45, marginTop: 15 }}>
                                    <Text style={{ fontSize: 14, fontFamily: visueltProMedium, color: '#EE1F1F' }}>Weight can't be 0</Text>
                                </View>
                                :
                                null
                        }
                        <View style={{ flexDirection: 'row', marginTop: 38 }}>
                            <Text style={{ marginLeft: 45, fontSize: 18, fontFamily: visueltProRegular, color: '#383838' }}>Height</Text>
                            <Text style={{ marginLeft: 169, fontSize: 18, fontFamily: visueltProBold, color: '#0035FF' }}>{this.state.selectedHeight.toFixed(1) == '0.0' ? '0' : this.state.selectedHeight.toFixed(1)}</Text>
                            <Text style={{ marginLeft: 4, fontSize: 14, marginTop: 3, fontFamily: visueltProBold, color: '#0035FF' }}>FT</Text>
                        </View>
                        <View style={{ width: 251, height: 1, backgroundColor: '#B9B9B9', marginTop: 22.75, marginLeft: 44.5 }}></View>
                        <FlatList
                            data={this.state.height}
                            initialNumToRender={30}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            // initialScrollIndex={this.state.selectedHeightIndex == -1 ? 15 : (this.state.selectedHeightIndex / 2)}
                            //getItemLayout={this.getItemLayout}
                            style={{ marginLeft: 45, width: 245 }}
                            renderItem={({ item, index }) => {
                                if (item.toFixed(1)[item.toFixed(1).length - 1] == '0' || item.toFixed(1)[item.toFixed(1).length - 1] == '5') {
                                    return (
                                        <View>
                                            {
                                                index == this.state.selectedHeightIndex
                                                    ?
                                                    <View style={{ marginTop: 1, marginRight: 0, marginLeft: index == 0 ? 7 : 0 }}>

                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedHeight: item, selectedHeightIndex: index, isHeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', borderWidth: 2.5, borderColor: '#0035FF', marginLeft: -3 }}></View>
                                                            <View style={{
                                                                height: 5, width: 15, backgroundColor: '#0035FF', borderRadius: 5, marginLeft: -8
                                                            }}></View>
                                                            <Text style={{ marginLeft: -7, marginTop: 5, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item.toFixed(1)}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={{ marginTop: 3, marginRight: 0, marginLeft: index == 0 ? 7 : 0 }}>

                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedHeight: item, selectedHeightIndex: index, isHeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9' }}></View>
                                                            <Text style={{ marginLeft: -7, marginTop: 9, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item.toFixed(1)}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>
                                    )
                                }
                                else {
                                    return (
                                        <View>
                                            {
                                                index == this.state.selectedHeightIndex
                                                    ?
                                                    <View style={{ marginTop: 1 }}>
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedHeight: item, selectedHeightIndex: index, isHeightZero: false }) }}>
                                                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', marginRight: 7, borderWidth: 2.5, borderColor: '#0035FF' }}></View>
                                                            <View style={{
                                                                height: 5, width: 15, backgroundColor: '#0035FF', borderRadius: 5, marginLeft: -5
                                                            }}></View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={{ marginTop: 3 }}>
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedHeight: item, selectedHeightIndex: index, isHeightZero: false }) }}>
                                                            <View style={{ height: 11, width: 1, backgroundColor: '#B9B9B9', marginRight: 9 }}></View>
                                                        </TouchableOpacity>
                                                    </View>
                                            }
                                        </View>
                                    )
                                }
                            }}
                        />
                        {
                            this.state.isHeightZero ?
                                <View style={{ marginLeft: 45, marginTop: 15 }}>
                                    <Text style={{ fontSize: 14, fontFamily: visueltProMedium, color: '#EE1F1F' }}>Height can't be 0</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
                <View style={{ flex: 0.15 }}>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 86, marginLeft: -34 }}></View>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 170, marginLeft: -5 }}></View>
                    <Animated.View style={{ borderColor: '#1ACC2C', height: 21, width: 21, marginTop: 166, marginLeft: -10, borderRadius: 15, borderWidth: 2, justifyContent: 'center', alignItems: 'center', transform: [{ scale: changeMargin }] }}>
                        <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11 }}></View>
                    </Animated.View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 170, marginLeft: -5 }}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight activeOpacity={0.7} onPress={() => { this.onClickPrev() }} underlayColor='#E2E2E2'>
                            <View style={{ borderRadius: 50, width: 78, height: 78, marginTop: 129, marginLeft: -300, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} >
                                <Image source={IMAGES[2]} style={{ height: 25, width: 25 }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onClickNext() }}>
                            <LinearGradient style={{ borderRadius: 50, width: 78, height: 78, marginTop: 129, marginLeft: -55, justifyContent: 'center', alignItems: 'center' }} colors={['#3023AE', '#53A0FD', '#6cb5ca', '#bcdcbc']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.1, 0.7, 1]} >
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

export default WeightHeight