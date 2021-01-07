import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Animated, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium } from './../utils/font';
import { Easing } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
const IMAGES = [
    require('./../assets/images/leftContainer.png'),
    require('./../assets/images/nextButton.png'),
]
class LoginName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFirstNameSelected: this.props.isFirstNameSelected,
            firstName: this.props.firstName,
            isLastNameSelected: this.props.isLastNameSelected,
            lastName: this.props.lastName,
            isFirstNameEmpty: false,
            isLastNameEmpty: false,
        }
    }
    validate = () => {
        this.setState({ isFirstNameSelected: true })
        this.setState({ isLastNameSelected: true })
        if (this.state.firstName == '') {
            this.setState({ isFirstNameEmpty: true })
        }
        else {
            this.setState({ isFirstNameEmpty: false })
        }
        if (this.state.lastName == '') {
            this.setState({ isLastNameEmpty: true })
        }
        else {
            this.setState({ isLastNameEmpty: false })
        }
    }
    onClickNext = async () => {
        Linking.openURL('sample://')
        await this.validate();
        if (!this.state.isFirstNameEmpty && !this.state.isLastNameEmpty) {
            var data = [this.state.firstName, this.state.lastName]
            this.setState(() => { this.props.onClickNext('Second', data) })
        }
    }
    render() {
        return (
            <LinearGradient colors={['#F7F7F7', '#FFFFFF']} style={styles.container} locations={[0.5, 1]}>
                <View style={styles.leftContainer}>
                    <Animated.View>
                        <Text style={{ fontSize: 18, fontFamily: visueltProRegular, marginTop: 62, color: '#818181', marginLeft: 45 }}>Registration</Text>
                        <Text style={{ fontSize: 48, fontFamily: visueltProMedium, marginTop: 2, color: '#383838', marginLeft: 43 }}>Steps</Text>
                        {
                            this.state.isFirstNameSelected
                                ?
                                <>
                                    <Text style={{ fontFamily: visueltProRegular, color: '#818181', fontSize: 18, marginLeft: 45, marginTop: 109 }}>First Name</Text>
                                    <TextInput
                                        value={this.state.firstName}
                                        onChangeText={(text) => { this.setState({ firstName: text }); this.setState({ isFirstNameEmpty: false }) }}
                                        placeholder=''
                                        placeholderTextColor='#818181'
                                        autoFocus={true}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 6, color: '#383838', marginLeft: 43 }} />
                                    {
                                        !this.state.isFirstNameEmpty ?
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#1ACC2C', marginTop: 4.7 }}></View> :
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#EE1F1F', marginTop: 4.7 }}></View>
                                    }
                                    {
                                        this.state.isFirstNameEmpty ?
                                            <Text style={{ marginTop: 15.25, marginLeft: 45, color: '#EE1F1F', fontFamily: visueltProMedium, fontSize: 14 }}>This can't be empty</Text>
                                            :
                                            null
                                    }
                                </>
                                :
                                <>
                                    <TextInput
                                        value={this.state.firstName}
                                        onChangeText={({ name }) => { this.setState({ firstName: name }) }}
                                        placeholder='First name'
                                        placeholderTextColor='#818181' onFocus={() => { this.setState({ isFirstNameSelected: true }) }}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 138, color: '#383838', marginLeft: 43 }} />
                                    <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#B9B9B9', marginTop: 4.7 }}></View>
                                </>

                        }
                        {
                            this.state.isLastNameSelected
                                ?
                                <>
                                    <Text style={{ fontFamily: visueltProRegular, color: '#818181', fontSize: 18, marginLeft: 45, marginTop: this.state.isFirstNameEmpty ? 66 : 86 }}>Last Name</Text>
                                    <TextInput
                                        value={this.state.lastName}
                                        onChangeText={(name) => { this.setState({ lastName: name, isLastNameEmpty: false }) }}
                                        placeholder=''
                                        placeholderTextColor='#818181'
                                        autoFocus={true}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 6, color: '#383838', marginLeft: 43 }} />
                                    {
                                        !this.state.isLastNameEmpty ?
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#1ACC2C', marginTop: 4.7 }}></View> :
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#EE1F1F', marginTop: 4.7 }}></View>
                                    }
                                    {
                                        this.state.isLastNameEmpty ?
                                            <Text style={{ marginTop: 15.25, marginLeft: 45, color: '#EE1F1F', fontFamily: visueltProMedium, fontSize: 14 }}>This can't be empty</Text>
                                            :
                                            null
                                    }

                                </>
                                :
                                <>
                                    <TextInput
                                        value={this.state.lastName}
                                        onChangeText={(name) => { this.setState({ lastName: name }) }}
                                        placeholder='Last name'
                                        placeholderTextColor='#818181'
                                        onFocus={() => { this.setState({ isLastNameSelected: true }) }}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 115, color: '#383838', marginLeft: 43 }} />
                                    <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#B9B9B9', marginTop: 4.7 }}></View>
                                </>

                        }
                    </Animated.View>
                </View>
                <View style={{ flex: 0.15 }}>
                    <View style={{ borderColor: '#1ACC2C', height: 21, width: 21, marginTop: 86, marginLeft: -35, borderRadius: 15, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11 }}></View>
                    </View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 166, marginLeft: -5 }}></View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 170, marginLeft: -5 }}></View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 174, marginLeft: -5 }}></View>
                    {
                        <LinearGradient style={{ borderRadius: 50, width: 78, height: 78, marginTop: Platform.OS == 'ios' ? 129 : 80, marginLeft: -55, justifyContent: 'center', alignItems: 'center' }} colors={['#3023AE', '#53A0FD', '#6cb5ca', '#bcdcbc']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.1, 0.7, 1, 1]} >
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onClickNext() }}>
                                <Image source={IMAGES[1]} style={{ height: 25, width: 25 }} />
                            </TouchableOpacity>
                        </LinearGradient>
                    }
                </View>
            </LinearGradient>
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
export default LoginName;