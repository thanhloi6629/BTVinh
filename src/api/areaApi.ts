
import {IAreaMst, IAreaMstValidation, IContent, IRequestSearchAreaMst} from 'components/pages/areaMst/type';
  import ApiClient from './ApiClient';
  
export const getAreaMstApi = async (request: IRequestSearchAreaMst): Promise<IAreaMst[]> => {
    const { data } = await ApiClient.get('/v1/areaMasters/', { ...request });
    return data;
  };

  export const getAreaMstDetailApi = async (id: string): Promise<IContent> => {
    const { data } = await ApiClient.get(`/v1/areaMasters/${id}`, {});
    return data;
  };
  
  export const createOrUpdateAreaMstApi = async (id: string, params: IAreaMstValidation): Promise<IAreaMstValidation> => {
    if (id) {
      const { data } = await ApiClient.putJsonData(`/v1/areaMasters/${id}`, {}, params);
      return data;
    }
    const { data } = await ApiClient.postJsonData('/v1/areaMasters', {}, params);
    return data;
  };