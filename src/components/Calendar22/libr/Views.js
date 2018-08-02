import { views } from './utils/constants'
import Month from './Month'
import Day from './Day'
import Week from './Week'

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.DAY]: Day,
}

export default VIEWS
