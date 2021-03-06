import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Modal, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

const iosStatusBarHeight = getStatusBarHeight()
const { width } = Dimensions.get('window')

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            profile: PropTypes.object.isRequired,
            noticeNew: PropTypes.bool.isRequired,
            notificationNew: PropTypes.bool.isRequired,
            handleNoticeNewChange: PropTypes.func.isRequired,
            handleNotificationNewChange: PropTypes.func.isRequired,
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
            following_count: PropTypes.number.isRequired, 
            follower_count: PropTypes.number.isRequired,
            is_following: PropTypes.bool.isRequired, 
            is_me: PropTypes.bool.isRequired, 
            following_friends_count: PropTypes.number.isRequired,
            like_exhibition_count: PropTypes.number.isRequired, 
            like_artwork_count: PropTypes.number.isRequired, 
            like_review_count: PropTypes.number.isRequired,
            loadingReviewList: PropTypes.bool.isRequired,
            reviewListMore: PropTypes.func.isRequired,
            isLoadingMore: PropTypes.bool.isRequired,
            hasNextPage: PropTypes.bool.isRequired,
            reviewList: PropTypes.array,
            refreshing: PropTypes.bool.isRequired,
            refresh: PropTypes.func.isRequired
        }
    }

    render(){
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 50+iosStatusBarHeight],
            extrapolate: 'clamp'
        });
        const headerPadding = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, iosStatusBarHeight],
            extrapolate: 'clamp'
        });
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const headerColor = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            extrapolate: 'clamp'
        });
        const { profile, noticeNew, notificationNew, showNoticeModal, following_count, follower_count, is_following, is_me, following_friends_count, like_exhibition_count, like_artwork_count, like_review_count, loadingReviewList, isLoadingMore, hasNextPage, reviewList, refreshing } = this.props;
        return(
            <View style={[styles.container]}>
                <Animated.View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px15,
                    {width, height: 50 + iosStatusBarHeight, position: 'absolute', top: 0, paddingTop: iosStatusBarHeight, zIndex: 999, backgroundColor: headerColor}
                ]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Alert', { notificationNew, noticeNew, handleNoticeNewChange: this.props.handleNoticeNewChange, handleNotificationNewChange: this.props.handleNotificationNewChange })}>
                        <View>
                            {((noticeNew) || (notificationNew)) ? (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification_alert.png')} />
                            ) : (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Text style={[styles.fontBold, styles.font20, {opacity: headerOpacity}]}>{`${profile.nickname}님의 프로필`}</Animated.Text>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
                        <View>
                            <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/search.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }}]
                    )}
                    bounces={false}
                    scrollEventThrottle={16}
                >
                    {profile.background_image ? (
                        <ImageBackground
                            source={{uri: profile.background_image}}
                            style={[styles.paddingIOS, styles.px15, styles.justifyContentEnd, styles.pb15, {height: 210}]}
                            resizeMode={'cover'}
                        >
                            {profile.profile_image ? (
                                <Image source={{uri: profile.profile_image}} style={[styles.profileImage70]} />
                            ) : (
                                <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage70]} />
                            )}
                        </ImageBackground>
                    ) : (
                        <ImageBackground
                            source={require('../../assets/images/empty_bg.png')}
                            style={[styles.paddingIOS, styles.px15, styles.justifyContentEnd, styles.pb15, {height: 210}]}
                            resizeMode={'cover'}
                        >
                            {profile.profile_image ? (
                                <Image source={{uri: profile.profile_image}} style={[styles.profileImage70]} />
                            ) : (
                                <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage70]} />
                            )}
                        </ImageBackground>
                    )}
                    
                    <ImageBackground source={require('../../assets/images/gradient.png')} style={[styles.px15, {paddingBottom: 70}]}>
                        <View style={[styles.row, styles.pt20, styles.px5, styles.justifyContentBetween]}>
                            <Text style={[styles.fontBold, styles.font25]}>{profile.nickname}</Text>
                            <View style={[styles.row]}>
                                <TouchableOpacity style={[styles.profileBtn]} onPress={()=>this.props.navigation.navigate('EditProfile')}>
                                    <Text style={[styles.fontMedium, styles.font15, {color: '#a8a8a8'}]}>프로필 변경</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.profileBtn, styles.ml20]} onPress={()=>this.props.logout()}>
                                    <Text style={[styles.fontMedium, styles.font15, {color: '#a8a8a8'}]}>로그아웃</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.row, styles.px5]}>
                            <Text style={[styles.fontMedium, styles.font13, {color: '#a7a7a7'}]}>팔로워</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>{follower_count}</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml30, {color: '#a7a7a7'}]}>팔로잉</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>{following_count}</Text>
                        </View>
                            <View style={[styles.row, styles.justifyContentEven, styles.profileBox, styles.mt20]}>
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('LikeList', { index: 0 })}>
                                    <View style={[styles.alignItemsCenter]}>
                                        <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>{like_exhibition_count}</Text>
                                        <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 전시</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('LikeList', { index: 1 })}>
                                    <View style={[styles.alignItemsCenter]}>
                                        <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>{like_artwork_count}</Text>
                                        <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 작품</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('LikeList', { index: 2 })}>
                                    <View style={[styles.alignItemsCenter]}>
                                        <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>{like_review_count}</Text>
                                        <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                    </ImageBackground>
                    {loadingReviewList ? (
                        <View style={[styles.mt20, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <ActivityIndicator size={'small'} color={'#000'} />
                        </View>
                    ) : (
                        reviewList && reviewList.length > 0 ? (
                            <FlatList 
                            data={reviewList} 
                            renderItem={({item}) => (
                                <ArtuiumCard from={'Profile'} review={item} size={'xlarge'} navigation={this.props.navigation} />
                            )} 
                            numColumns={1} 
                            keyExtractor={item => String(item.id)} 
                            refreshing={refreshing} 
                            onRefresh={this.props.refresh} 
                            onEndReached={hasNextPage ? this.props.reviewListMore : null} 
                            onEndReachedThreshold={0.5} 
                            bounces={true} 
                            ListFooterComponent={isLoadingMore ? (
                                <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                                    <ActivityIndicator size={'small'} color={'#000000'} />
                                </View>
                            ): null} />
                        ) : (
                            <ScrollView 
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.props.refresh} tintColor={'#000000'} />}
                            >
                                <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                            </ScrollView>
                        )
                    )}
                </ScrollView>
            </View>
        )
    }
}

ProfileScreen.propTypes = {

}

export default ProfileScreen;