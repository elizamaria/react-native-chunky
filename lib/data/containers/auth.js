import { token, error }    from '../selectors'
import { authenticate }    from '../actions'
import { Container }       from '../../..'

export default function (component) {
  return Container(component, { token, error }, { authenticate })
}
