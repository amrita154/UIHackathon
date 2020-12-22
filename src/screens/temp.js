<View style={{ marginRight: 2 }}>
    {
        (index == 0
            ?
            (index == this.state.selectedWeightIndex
                ?
                <>
                    <TouchableOpacity style={{ borderWidth: 0 }} activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                        <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', marginLeft: 7, borderWidth: 3, borderColor: '#0035FF' }}></View>
                        <View style={{
                            height: 6, width: 18, backgroundColor: '#0035FF', marginLeft: 0.5, borderRadius: 5
                        }}></View>
                        <Text style={{ marginTop: 4, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>

                    </TouchableOpacity>
                </>
                :

                <>
                    <TouchableOpacity style={{ borderWidth: 0 }} activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                        <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', marginLeft: 7, borderWidth: 0, borderColor: '#0035FF' }}></View>
                        <Text style={{ marginTop: 9, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>

                    </TouchableOpacity>
                </>
            )
            :
            (
                index == this.state.selectedWeightIndex
                    ?
                    <>
                        <TouchableOpacity style={{ borderWidth: 0 }} activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', borderWidth: 3, borderColor: '#0035FF', marginLeft: -2 }}></View>
                            <View style={{
                                height: 6, width: 18, backgroundColor: '#0035FF', marginLeft: -8, borderRadius: 5
                            }}>
                            </View>
                            <Text style={{ marginLeft: -7, marginTop: 4, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity style={{ borderWidth: 0 }} activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                            <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', borderWidth: 0, borderColor: '#0035FF', marginLeft: 0 }}></View>

                            <Text style={{ marginLeft: -7, marginTop: 9, color: '#383838', fontFamily: visueltProRegular, fontSize: 12 }}>{item}</Text>
                        </TouchableOpacity>
                    </>
            )
        )


    }
</View>
)
}
else {
    return (
        <View style={{ marginRight: 2 }}>

            {
                this.state.selectedWeightIndex == index ?
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                        <View style={{ height: 40, width: 1, backgroundColor: '#B9B9B9', marginRight: 2, borderWidth: 3, borderColor: '#0035FF', marginLeft: -1 }}></View>

                        <View style={{
                            height: 6, width: 18, backgroundColor: '#0035FF', marginLeft: -7, borderRadius: 5
                        }}></View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ selectedWeight: item, selectedWeightIndex: index }) }}>
                        <View style={{ height: 10, width: 1, backgroundColor: '#B9B9B9', marginRight: 6, borderWidth: 0, borderColor: '#0035FF', marginLeft: 0 }}></View>
                    </TouchableOpacity>
            }
        </View>
    )
}