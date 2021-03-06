import React from 'react';
import { View, Text, Platform, Image, ScrollView, KeyboardAvoidingView, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';

const iosStatusBarHeight = getStatusBarHeight()
const { width, height } = Dimensions.get('window')

class EditProfileScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            keyboardHeight: 0
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

    render(){
        const { keyboardHeight } = this.state;
        return(
            <View style={[styles.container, styles.bgGrayf0]}>
                <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px25, styles.bgWhite, {width, height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <View style={[styles.pr20]}>
                            <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9*1.6, height: 17*1.6}]} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font20]}>프로필 변경</Text>
                    <TouchableOpacity onPress={() => this.props.handleChangeProfile()}>
                        <View style={[styles.pl20]}>
                            <Text style={[styles.fontMedium, styles.font16, {color: '#044ae6'}]}>완료</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView bounces={false}>
                    <View>
                        <View style={[styles.alignItemsCenter]}>
                            {this.props.savedBackgroundImg ? 
                                <Image
                                    source={{uri: this.props.savedBackgroundImg.uri}}
                                    style={[{width, height: 210}]}
                                />
                            :
                                this.props.profile.background_image ? 
                                    <Image
                                        source={{uri: this.props.profile.background_image}}
                                        style={[{width, height: 210}]} resizeMode={'cover'}
                                    />
                                :
                                    <Image
                                        source={require('../../assets/images/empty_bg.png')}
                                        style={[{width, height: 210}]}
                                    />
                            }
                            <TouchableWithoutFeedback onPress={()=>this.props.handleChangeBackgroundImg()}>
                                <View style={[styles.blueBtn, styles.my15]}>
                                    <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>커버 사진 바꾸기</Text>
                                </View> 
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.divGray]} />
                        <View style={[styles.center, {height: 150}]}>
                            {this.props.savedProfileImg ? 
                                <Image
                                    source={{uri: this.props.savedProfileImg.uri}}
                                    style={[styles.profileImage70]}
                                />
                            :
                                this.props.profile.profile_image ?
                                    <Image source={{uri: this.props.profile.profile_image}} style={[styles.profileImage70]} />
                                :
                                    <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage70]} />
                            }
                            <TouchableWithoutFeedback onPress={()=>this.props.handleChangeProfileImg()}>
                                <View style={[styles.blueBtn, styles.mt15]}>
                                    <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>프로필 사진 바꾸기</Text>
                                </View> 
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.divGray]} />
                        <View style={[styles.borderBtmGrayD1, { marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0 }]}>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30, styles.pt30]}>
                                <View style={[styles.flex1]}>
                                    <Text style={[styles.fontMedium, styles.font16]}>이름</Text>
                                </View>
                                <View style={[styles.flex3, styles.justifyContentCenter]}>
                                    <TextInput
                                        style={[styles.font16, styles.black]}
                                        underlineColorAndroid={'transparent'} 
                                        autoCapitalize={'none'} 
                                        autoCorrect={false} 
                                        value={this.props.nickname} 
                                        onChangeText={this.props.handleNicknameChange} 
                                    />
                                </View>
                                <View style={[styles.flex1]}>
                                    <TouchableOpacity style={[styles.GrayXBtn]} onPress={()=>this.props.handleNicknameClear()}>
                                        <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.flex2]}>
                                    <TouchableOpacity style={[styles.blueBtn]} onPress={()=>this.props.handleCheckNickname(this.props.nickname)}>
                                        <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>중복확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30]}>
                                <View style={[styles.flex1, styles.hidden]}>
                                    <Text style={[styles.fontMedium, styles.font16]}>이름</Text>
                                </View>
                                <View style={[styles.flex3]}>
                                {
                                    !this.props.isCheckingNickname && this.props.checkedNickname ?
                                        this.props.nicknameForm ?
                                            this.props.availableNickname ?
                                                <Text style={[styles.fontMedium, styles.font12, {color: '#000', opacity: 0.5}]}>사용 가능한 닉네임</Text>
                                            :
                                                <Text style={[styles.fontMedium, styles.font12, {color: '#ff4545'}]}>이미 사용중인 닉네임</Text>
                                        :
                                            <Text style={[styles.fontMedium, styles.font12, {color: '#ff4545'}]}>형식이 맞지 않는 닉네임</Text>
                                    :
                                    null
                                }
                                </View>
                                <View style={[styles.flex1, styles.hidden]}>
                                    <TouchableOpacity style={[styles.GrayXBtn]}>
                                        <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.flex2, styles.hidden]}>
                                    <TouchableOpacity style={[styles.blueBtn]}>
                                        <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>중복확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

EditProfileScreen.propTypes = {

}

export default EditProfileScreen;