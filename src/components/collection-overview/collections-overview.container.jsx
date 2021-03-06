import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors"
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';
import { compose } from 'redux';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner,
)(CollectionsOverview);

export default  CollectionsOverviewContainer;
