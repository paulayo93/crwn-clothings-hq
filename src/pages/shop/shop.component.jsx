import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapShotToMap, firestore } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

 state = {
   loading: true
 };

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');


    collectionRef.get().then(snapshot => {
    const collectionMap =   convertCollectionsSnapShotToMap(snapshot)
    updateCollections(collectionMap);
    this.setState({loading: false});
    });
  }

  render() {
    const {match} = this.props;
    const {loading} = this.state;

    return (
    <div className='shop-page'>

      <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> }/>
      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
    </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null,mapDispatchToProps)(ShopPage);