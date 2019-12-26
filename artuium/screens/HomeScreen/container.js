import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        initialStatus: PropTypes.string,
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        initApp: PropTypes.func.isRequired,
        getInitial: PropTypes.func.isRequired,
        checkNoticeAll: PropTypes.func.isRequired,
        checkNotificationAll: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedProfile: false,
        fetchedNew: false,
        fetchedRecommended: false,
        fetchedFollowing: false,
        fetchClear: false,
        showNoticeModal: false,
        noticeNew: false,
        notificationNew: false,
    }

    componentDidMount = async() => {
        const { initApp, checkNoticeAll, checkNotificationAll } = this.props;
        const noticeNew = await checkNotificationAll()
        const notificationNew = await checkNoticeAll()
        if(noticeNew.is_new){
            this.setState({
                noticeNew: true
            })
        }
        if(notificationNew.is_new){
            this.setState({
                notificationNew: true
            })
        }
        await initApp()
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
        if(this.state.fetchedNew && this.state.fetchedRecommended && this.state.fetchedFollowing && this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
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
        this.setState({
            noticeNew
        })
    }

    _handleNotificationNewChange = (notificationNew) => {
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