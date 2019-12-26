import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';

const iosStatusBarHeight = getStatusBarHeight()
const { width, height } = Dimensions.get('window')

class EditProfileScreen extends React.Component {
    render(){
        return(
            <View style={[styles.container, styles.bgGrayf0]}>
                <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px25, styles.bgWhite, {width, height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font20]}>프로필 변경</Text>
                    <TouchableOpacity onPress={() => this.props.handleChangeNickname(this.props.nickname)}>
                        <Text style={[styles.fontMedium, styles.font16, {color: '#044ae6'}]}>완료</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView bounces={false}>
                    <KeyboardAvoidingView behavior={'padding'}>
                        <View style={[styles.alignItemsCenter]}>
                            {this.props.profile.background_image ? 
                            <Image
                                source={{uri: this.props.profile.background_image}}
                                style={[{width, height: 210}]} resizeMode={'cover'}
                            />
                            :
                            <View
                                style={[{width, height: 210, backgroundColor: '#e0e0e0'}]}
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
                            {this.props.profile.profile_image ?
                            <Image source={{uri: this.props.profile.profile_image}} style={[styles.profileImage70]} />
                            :
                            <View style={[styles.profileImage70, {backgroundColor: '#e0e0e0'}]} />
                            }
                            <TouchableWithoutFeedback onPress={()=>this.props.handleChangeProfileImg()}>
                                <View style={[styles.blueBtn, styles.mt15]}>
                                    <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>프로필 사진 바꾸기</Text>
                                </View> 
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.divGray]} />
                        <View style={[styles.borderBtmGrayD1]}>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30, styles.pt30]}>
                                <Text style={[styles.fontMedium, styles.font16]}>이름</Text>
                                <View>
                                    <TextInput
                                        style={[styles.font16, {includeFontPadding: false, textAlignVertical: 'center', height: 40, paddingBottom: 0}]}
                                        underlineColorAndroid={'transparent'} 
                                        autoCapitalize={'none'} 
                                        autoCorrect={false} 
                                        value={this.props.nickname} 
                                        onChangeText={this.props.handleNicknameChange} 
                                    />
                                </View>
                                <TouchableOpacity style={[styles.GrayXBtn]} onPress={()=>this.props.handleNicknameClear()}>
                                    <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.blueBtn]} onPress={()=>this.props.handleCheckNickname(this.props.nickname)}>
                                    <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>중복확인</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30]}>
                                <Text style={[styles.fontMedium, styles.font16, styles.hidden]}>이름</Text>
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
                                <TouchableOpacity style={[styles.GrayXBtn, styles.hidden]}>
                                    <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.blueBtn, styles.hidden]}>
                                    <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>중복확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

EditProfileScreen.propTypes = {

}

export default EditProfileScreen;