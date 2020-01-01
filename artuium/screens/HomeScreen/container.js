import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';
import firebase from 'react-native-firebase';

class Container extends Component{
    static propTypes = {
        initialStatus: PropTypes.string,
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        initApp: PropTypes.func.isRequired,
        getInitial: PropTypes.func.isRequired,
        checkNoticeAll: PropTypes.func.isRequired,
        checkNotificationAll: PropTypes.func.isRequired,
        setPushToken: PropTypes.func.isRequired,
        getNoticeNew: PropTypes.func.isRequired,
        getNotificationNew: PropTypes.func.isRequired,
        noticeNew: PropTypes.bool.isRequired,
        notificationNew: PropTypes.bool.isRequired
    }

    constructor(props){
        super(props);
        const { noticeNew, notificationNew } = props;
        this.state = {
            loading: true,
            fetchedProfile: false,
            fetchedNew: false,
            fetchedRecommended: false,
            fetchedFollowing: false,
            fetchClear: false,
            showNoticeModal: false,
            noticeNew,
            notificationNew,
            pushPermission: false
        }
    }

    _getToken = async() => {
        const { profile, setPushToken } = this.props;
        if(profile){
            fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                if(profile.push_token !== fcmToken){
                    const result =  await setPushToken(fcmToken);
                }
            }
        }
    };

    _checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.setState({
                pushPermission: true
            })
            // this._getToken();
        } 
        else {
            this._requestPermission();
        }
    };

    _requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            this.setState({
                pushPermission: true
            })
            // this._getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    };

    componentDidMount = async() => {
        const { initApp, checkNoticeAll, checkNotificationAll, getNoticeNew, getNotificationNew } = this.props;
        const noticeNew = await checkNoticeAll()
        const notificationNew = await checkNotificationAll()
        if(noticeNew.is_new){
            getNoticeNew(true)
            this.setState({
                noticeNew: true
            })
        }
        else{
            getNoticeNew(false)
            this.setState({
                noticeNew: false
            })
        }
        if(notificationNew.is_new){
            getNotificationNew(true)
            this.setState({
                notificationNew: true
            })
        }
        else{
            getNotificationNew(false)
            this.setState({
                notificationNew: false
            })
        }
        await initApp()
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('hihi')
        if(prevProps.noticeNew !== this.props.noticeNew){
            this.setState({
                noticeNew: this.props.noticeNew
            })
        }
        if(prevProps.notificationNew !== this.props.notificationNew){
            this.setState({
                notificationNew: this.props.notificationNew
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedNew, fetchedRecommended, fetchedFollowing, fetchedProfile } = prevState;
        if((!fetchedNew) || (!fetchedRecommended) || (!fetchedFollowing) || (!fetchedProfile)){
            let update = {}
            if((nextProps.newReviews)){
                update.fetchedNew = true
            }
            if((nextProps.recommendedReviews)){
                update.fetchedRecommended = true
            }
            if((nextProps.followingReviews)){
                update.fetchedFollowing = true
            }
            if(nextProps.profile){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.props.profile && this.state.fetchedNew && this.state.fetchedRecommended && this.state.fetchedFollowing && this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
            if(this.state.pushPermission){
                this._getToken()
            }
        }
    }

    _openNoticeModal = () => {
        this.setState({
            showNoticeModal: true
        })
    }

    _closeNoticeModal = () => {
        this.setState({
            showNoticeModal: false
        })
    }
    _handleNoticeNewChange = (noticeNew) => {
        this.props.getNoticeNew(noticeNew)
        this.setState({
            noticeNew
        })
    }

    _handleNotificationNewChange = (notificationNew) => {
        this.props.getNotificationNew(notificationNew)
        this.setState({
            notificationNew
        })
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size={'small'} color={'#000'} />
                </View>
            )
        }
        else{
            return(
                <HomeScreen 
                    {...this.props}
                    {...this.state}
                    openNoticeModal={this._openNoticeModal}
                    closeNoticeModal={this._closeNoticeModal}
                    handleNoticeNewChange={this._handleNoticeNewChange}
                    handleNotificationNewChange={this._handleNotificationNewChange}
                />
            )
        }
    }
}

export default Container;