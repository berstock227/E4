export const ok = (res, data = null, meta = null, status = 200) => {
  return res.status(status).json({ success: true, data, error: null, meta });
};

export const fail = (res, code = 'ERROR', message = 'Unexpected error', details = null, status = 400) => {
  return res.status(status).json({ success: false, data: null, error: { code, message, details }, meta: null });
};
