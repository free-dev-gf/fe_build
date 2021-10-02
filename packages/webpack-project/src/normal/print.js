import _ from 'lodash';

export default function printMe() {
  console.log(_.uniq([1, 1, 2]));
}