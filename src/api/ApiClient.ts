import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import {stringify}  from 'qs';
import {saveAs} from 'file-saver';
import moment from 'moment';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from 'utility/browserStorageUtil';

const domainUrl = 'https://jsonplaceholder.typicode.com/'
let refreshTokenRequest: any = null;
const refreshTokenUrl = '/oauth/token';
export type QueryObject = { [key: string]: string | number | boolean }


export default class ApiClient {
    /**
   * GETリクエスト
   *
   * @param url リクエストURL
   * @param params GETパラメータ
   */
  static async get(url: string, params: object, query?: undefined | {[key: string]: string | boolean } | string): Promise<AxiosResponse>{
    let requestUrl = query? `${url}?${stringify(query)}`: url;
    if(typeof query === 'string'){
        requestUrl = `${url}${query}`;
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params, 
      headers: await this.getHeaders(), 
       // validateStatus,
      // @see https://github.com/axios/axios/issues/86#issuecomment-311788525
      data: {},})
    return response;
  }

  static async getHeaders(contentType: string = 'application/x-www-form-urlencoded') {
  return {
      'Content-Type': contentType,
      authorization: await this.getToken(),
  }
  }

  private static async getToken() {
        // Check token expired moment(targetDay).utcOffset(9).format('YYYY-MM-DD')
        const timeNow = moment().utcOffset(9).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const expiredToken = getLocalStorage('expiredToken');
        const isTokenExpired = expiredToken ? moment(expiredToken).isBefore(timeNow, 'minutes') : false; // check token is expired
        if (isTokenExpired) {
          refreshTokenRequest = refreshTokenRequest || this.refreshToken();
          const accessToken = await refreshTokenRequest;
          refreshTokenRequest = null;
          return `Bearer ${accessToken}`;
        }
        const accessToken = getLocalStorage('accessToken');
        return `Bearer ${accessToken}`;
  }

  private static convertToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams();
    let formKey;

    for (const property in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`;
          } else {
            formKey = `${namespace}.${property}`;
          }
        } else {
          formKey = property;
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object'
          && !(obj[property] instanceof File)
          && !(obj[property] instanceof Blob)) {
          this.convertToPostData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  static async post(url: string, query: QueryObject, params: any, appendUrl?: string): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const param = this.convertToPostData(params, undefined, undefined);
    const response = await axios.post(domainUrl + requestUrl, param, config);
    return response;
  }
    
  private static async refreshToken(): Promise<string> {
    try {
      const refreshToken = getLocalStorage('accessRefreshToken');
      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };
      const response = await axios.post(domainUrl + refreshTokenUrl, stringify({ refreshToken }), config);
      setLocalStorage('expiredToken', moment().utcOffset(9).add(Math.floor(Number(response?.data?.expiresIn || 0) / 60), 'minutes').format('YYYY-MM-DD HH:mm:ss'));
      setLocalStorage('accessToken', response?.data?.accessToken);
      setLocalStorage('accessRefreshToken', response?.data?.refreshToken);
      return response?.data?.accessToken || '';
    } catch (error) {
      removeLocalStorage('accessToken');
      removeLocalStorage('accessRefreshToken');
      removeLocalStorage('expiredToken');
      removeLocalStorage('staffId');
      removeLocalStorage('user');
      return '';
    }
  }


  static async postJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.post(domainUrl + requestUrl, params, config);
    return response;
  }

  static async putJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.put(domainUrl + requestUrl, params, config);
    return response;
  }
}



