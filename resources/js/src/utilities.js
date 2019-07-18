import SimpleCrypto from "simple-crypto-js";
import ExpiredStorage from "expired-storage";

export const filterText = text => {
  return text.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const expiredStorage = new ExpiredStorage();
export const simpleCrypto = new SimpleCrypto(
  "c9a1375fc3e8f227b3efda9947502153b73d37696bd1a90ed1c2cd79caaeb14b"
);
