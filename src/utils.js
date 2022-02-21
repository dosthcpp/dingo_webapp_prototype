export const parseDateForFirebase = (_date) => {
  return `${_date.getFullYear()}-${
    _date.getMonth() + 1 > 10
      ? _date.getMonth() + 1
      : `0${_date.getMonth() + 1}`
  }-${_date.getDate() > 10 ? _date.getDate() : `0${_date.getDate()}`} ${
    _date.getHours() > 10 ? _date.getHours() : `0${_date.getHours()}`
  }:${
    _date.getMinutes() > 10 ? _date.getMinutes() : `0${_date.getMinutes()}`
  }:${
    _date.getSeconds() > 10 ? _date.getSeconds() : `0${_date.getSeconds()}`
  }.${
    _date.getMilliseconds() > 10
      ? _date.getMilliseconds()
      : `${_date.getMilliseconds()}`
  }`;
};

export const parseDateForFirebaseWithoutTime = (_date) => {
  return `${_date.getFullYear()}-${
    _date.getMonth() + 1 > 10
      ? _date.getMonth() + 1
      : `0${_date.getMonth() + 1}`
  }-${_date.getDate() > 10 ? _date.getDate() : `0${_date.getDate()}`}`;
};
