import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as artworkActions } from '../../redux/modules/artwork';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        likeArtwork: (artworkId) => {
            return dispatch(artworkActions.likeArtwork(artworkId))
        },
        unlikeArtwork: (artworkId) => {
            return dispatch(artworkActions.unlikeArtwork(artworkId))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);