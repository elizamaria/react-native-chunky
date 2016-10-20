import { authSelector  }    from '../selectors'
import { authenticate }     from '../actions'
import { Container }        from '../../..'

export default function (component) {
  return Container(component, { authSelector }, { authenticate })
}
