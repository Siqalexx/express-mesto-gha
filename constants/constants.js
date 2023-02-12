const OK = 200;
const CREATE_OBJECT = 201;
const VALIDERR = 400;
const DATA_ERROR = 401;
const NO_ACCESS = 403;
const ERRORSRC = 404;
const DUBLICATE_DATA = 409;
const OTHERERR = 500;
const REQUIRED_PARAMETER = 422;
const REGEPX_URL = /https?:\/\/[www.]?[a-z1-9\-*.*_*~*:*/*?*#*[*\]*@*!*$*&*'*(*)***+*,*;*=*]+\.[a-z]+[a-z1-9\-*.*_*~*:*/*?*#*[*\]*@*!*$*&*'*(*)***+*,*;*=*]*/im;
module.exports = {
  OK,
  VALIDERR,
  OTHERERR,
  ERRORSRC,
  REQUIRED_PARAMETER,
  DATA_ERROR,
  DUBLICATE_DATA,
  NO_ACCESS,
  CREATE_OBJECT,
  REGEPX_URL,
};
