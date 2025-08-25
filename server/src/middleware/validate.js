import { fail } from '../utils/response.js';

export function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => !(f in (req.body || {})) || req.body[f] === '' || req.body[f] === null);
    if (missing.length) {
      return fail(res, 'VALIDATION_ERROR', 'Missing fields: ' + missing.join(', '), null, 422);
    }
    next();
  };
}
