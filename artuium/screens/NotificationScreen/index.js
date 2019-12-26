import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotification: () => {
            return dispatch(userActions.getNotification())
        },
        getNotificationMore: (page) => {
            return dispatch(userActions.getNotificationMore(page))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);