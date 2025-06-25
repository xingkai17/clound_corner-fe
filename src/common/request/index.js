import { catchNoErr } from '@/common/utils/catch-error';
import { axiosGet, axiosPost, axiosPut } from './request';

export function _get(...args) {
  return catchNoErr(axiosGet(...args));
}

export function _post(...args) {
  return catchNoErr(axiosPost(...args));
}

export function _put(...args) {
  return catchNoErr(axiosPut(...args));
}
