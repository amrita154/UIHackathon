import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium } from './../utils/font';
const IMAGES = [
    require('./../assets/images/leftContainer.png'),
    require('./../assets/images/nextButton.png'),
    require('./../assets/images/backButton.png')
]
class JobInfo extends React.Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.state = {
            isCompanyNameSelected: this.props.isCompanyNameSelected,
            companyName: this.props.companyName,
            isDesignationSelected: this.props.isDesignationSelected,
            designation: this.props.designation,
            isCompanyNameEmpty: false,
            isDesignationEmpty: false,
        }
    }
    componentDidMount = () => {
        this.animate()
    }
    validate = () => {
        this.setState({ isCompanyNameSelected: true })
        this.setState({ isDesignationSelected: true })
        if (this.state.companyName == '') {
            this.setState({ isCompanyNameEmpty: true })
        }
        else {
            this.setState({ isCompanyNameEmpty: false })
        }
        if (this.state.designation == '') {
            this.setState({ isDesignationEmpty: true })
        }
        else {
            this.setState({ isDesignationEmpty: false })
        }
    }
    onClickNext = async () => {
        await this.validate();
        if (!this.state.isCompanyNameEmpty && !this.state.isDesignationEmpty) {
            var data = [this.state.companyName, this.state.designation]
            this.setState(() => { this.props.onClickNext('Third', data) })
        }
    }
    onClickPrev = () => {
        this.setState(() => { this.props.onClickPrev('First') })
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
                            this.state.isCompanyNameSelected
                                ?
                                <>
                                    <Text style={{ fontFamily: visueltProRegular, color: '#818181', fontSize: 18, marginLeft: 45, marginTop: 109 }}>Company Name</Text>
                                    <TextInput
                                        value={this.state.companyName}
                                        onChangeText={(text) => { this.setState({ companyName: text }); this.setState({ isCompanyNameEmpty: false }) }}
                                        placeholder=''
                                        placeholderTextColor='#818181'
                                        autoFocus={true}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 6, color: '#383838', marginLeft: 43 }} />
                                    {
                                        !this.state.isCompanyNameEmpty ?
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#1ACC2C', marginTop: 4.7 }}></View> :
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#EE1F1F', marginTop: 4.7 }}></View>
                                    }
                                    {
                                        this.state.isCompanyNameEmpty ?
                                            <Text style={{ marginTop: 15.25, marginLeft: 45, color: '#EE1F1F', fontFamily: visueltProMedium, fontSize: 14 }}>This can't be empty</Text>
                                            :
                                            null
                                    }
                                </>
                                :
                                <>
                                    <TextInput
                                        value={this.state.companyName}
                                        onChangeText={({ name }) => { this.setState({ companyName: name }) }}
                                        placeholder='Company name'
                                        placeholderTextColor='#818181' onFocus={() => { this.setState({ isCompanyNameSelected: true }) }}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 138, color: '#383838', marginLeft: 43 }} />
                                    <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#B9B9B9', marginTop: 4.7 }}></View>
                                </>

                        }
                        {
                            this.state.isDesignationSelected
                                ?
                                <>
                                    <Text style={{ fontFamily: visueltProRegular, color: '#818181', fontSize: 18, marginLeft: 45, marginTop: this.state.isCompanyNameEmpty ? 66 : 86 }}>Designation</Text>
                                    <TextInput
                                        value={this.state.designation}
                                        onChangeText={(name) => { this.setState({ designation: name, isDesignationEmpty: false }) }}
                                        placeholder=''
                                        placeholderTextColor='#818181'
                                        autoFocus={true}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 6, color: '#383838', marginLeft: 43 }} />
                                    {
                                        !this.state.isDesignationEmpty ?
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#1ACC2C', marginTop: 4.7 }}></View> :
                                            <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#EE1F1F', marginTop: 4.7 }}></View>
                                    }
                                    {
                                        this.state.isDesignationEmpty ?
                                            <Text style={{ marginTop: 15.25, marginLeft: 45, color: '#EE1F1F', fontFamily: visueltProMedium, fontSize: 14 }}>This can't be empty</Text>
                                            :
                                            null
                                    }

                                </>
                                :
                                <>
                                    <TextInput
                                        value={this.state.designation}
                                        onChangeText={(name) => { this.setState({ designation: name }) }}
                                        placeholder='Designation'
                                        placeholderTextColor='#818181'
                                        onFocus={() => { this.setState({ isDesignationSelected: true }) }}
                                        style={{ fontSize: 24, fontFamily: visueltProRegular, marginTop: 115, color: '#383838', marginLeft: 43 }} />
                                    <View style={{ height: 1, width: 276, marginLeft: 44.5, backgroundColor: '#B9B9B9', marginTop: 4.7 }}></View>
                                </>

                        }
                    </View>
                </View>
                <View style={{ flex: 0.15 }}>
                    <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11, marginTop: 86, marginLeft: -34 }}></View>
                    <Animated.View style={{ borderColor: '#1ACC2C', height: 21, width: 21, marginTop: 166, marginLeft: -10, borderRadius: 15, borderWidth: 2, justifyContent: 'center', alignItems: 'center', transform: [{ scale: changeMargin }] }}>
                        <View style={{ backgroundColor: '#1ACC2C', borderRadius: 5, width: 11, height: 11 }}></View>
                    </Animated.View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 166, marginLeft: -5 }}></View>
                    <View style={{ backgroundColor: '#A0B1A2', borderRadius: 5, width: 11, height: 11, marginTop: 174, marginLeft: -5 }}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight activeOpacity={0.7} onPress={() => { this.onClickPrev() }} underlayColor='#E2E2E2'>
                            <View style={{ borderRadius: 50, width: 78, height: 78, marginTop: 129, marginLeft: -300, justifyContent: 'center', alignItems: 'center' }} >
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
export default JobInfo;