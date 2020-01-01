import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile, notificationNew, noticeNew } } = state;
    return{
        profile,
        notificationNew,
        noticeNew
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        checkNoticeAll: () => {
            return dispatch(userActions.checkNoticeAll())
        },
        checkNotificationAll: () => {
            return dispatch(userActions.checkNotificationAll())
        },
        getReviewList: () => {
            return dispatch(userActions.getReviewList())
        },
        getReviewListMore: (page) => {
            return dispatch(userActions.getReviewListMore(page))
        },
        logout: () => {
            dispatch(userActions.getLogout());
        },
        getNoticeNew: (noticeNew) => {
            dispatch(userActions.getNoticeNew(noticeNew))
        },
        getNotificationNew: (notificationNew) => {
            dispatch(userActions.getNotificationNew(notificationNew))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);