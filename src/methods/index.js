import { evaluate } from 'mathjs';

import newton from './newton';

const methods = {
  newton,
};

export default (method, { f, ...args }) =>
  methods[method]({ fn: f, f:(x) => evaluate(f, { x }), ...args });
