import * as selectors   from '../selectors'
import * as actions     from '../actions'
import { Container }    from '../../..'

export default function (component) {
  return Container(component, selectors, actions)
}
