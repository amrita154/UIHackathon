import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { visueltProRegular, visueltProMedium } from './../utils/font';
import LoginName from './LoginName';
import JobInfo from './JobInfo';
import WeightHeight from './WeightHeight';
import AgeInterest from './AgeInterest';
import { Finish } from './Finish';
import { ScrollView } from 'react-native-gesture-handler';

class First extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSecondStep: false,
            isThirdStep: false,
            isFourthStep: false,
            isComplete: false,
            firstName: '',
            lastName: '',
            companyName: '',
            designation: '',
            isFemaleSelected: false,
            selectedWeight: 0,
            selectedWeightIndex: -1,
            selectedHeight: 0,
            selectedHeightIndex: -1,
            selectedChoiceIndex: [],
            age: 23,
        }

    }

    onClickNext = (step, data) => {
        if (step == 'Second') {
            this.setState({ firstName: data[0] })
            this.setState({ lastName: data[1] })
            this.setState({ isSecondStep: true })
        }
        else if (step == 'Third') {
            this.setState({ companyName: data[0] })
            this.setState({ designation: data[1] })
            this.setState({ isThirdStep: true })
        }
        else if (step == 'Fourth') {
            this.setState({ isFemaleSelected: data[0] })
            this.setState({ selectedWeight: data[1] })
            this.setState({ selectedHeight: data[2] })
            this.setState({ selectedWeightIndex: data[3] })
            this.setState({ selectedHeightIndex: data[4] })
            this.setState({ isFourthStep: true })
        }
        else if (step == 'Fifth') {
            this.setState({ age: data[0] })
            this.setState({ selectedChoiceIndex: data[1] })
            this.setState({ isComplete: true })
        }
    }
    onClickPrev = (step) => {
        if (step == 'First') {
            this.setState({ isSecondStep: false })
        }
        else if (step == 'Second') {
            this.setState({ isSecondStep: true, isThirdStep: false })
        }
        else if (step == 'Third') {
            this.setState({ isThirdStep: true, isFourthStep: false })
        }
    }
    render() {
        return (
            <>
                {
                    this.state.isComplete ?
                        <Finish />
                        :
                        this.state.isFourthStep ?
                            <AgeInterest onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} age={this.state.age} selectedChoiceIndex={this.state.selectedChoiceIndex} firstName={this.state.firstName} lastName={this.state.lastName} navigation={this.props.navigation} /> :
                            this.state.isThirdStep ?
                                <WeightHeight onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} isFemaleSelected={this.state.isFemaleSelected} selectedHeight={this.state.selectedHeight} selectedHeightIndex={this.state.selectedHeightIndex} selectedWeightIndex={this.state.selectedWeightIndex} selectedWeight={this.state.selectedWeight} /> :
                                this.state.isSecondStep ?
                                    <JobInfo onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} companyName={this.state.companyName} designation={this.state.designation} isCompanyNameSelected={this.state.companyName != ''} isDesignationSelected={this.state.designation != ''} />
                                    :
                                    <LoginName onClickNext={this.onClickNext} firstName={this.state.firstName} lastName={this.state.lastName} isFirstNameSelected={this.state.firstName != ''} isLastNameSelected={this.state.lastName != ''} />
                }
            </>
        )
    }
}

export default First;