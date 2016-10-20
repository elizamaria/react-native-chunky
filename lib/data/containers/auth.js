import { authTokenSelector }  from '../selectors'
import { authenticate }       from '../actions'
import { connect }            from 'react-redux'

const mapStateToProps = (state) => ({
  token: (props) => authTokenSelector(props)
})

const mapDispatchToProps = (dispatch) => ({
  authenticate: (props) => dispatch(authenticate(props))
})

export default function (component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
