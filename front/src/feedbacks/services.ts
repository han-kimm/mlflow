import {
  deleteJson,
  getBigIntJson,
  getJson,
  postJson,
} from '../common/utils/FetchUtils';

export class Services {
  /**
   * Search registered models
   */
  static searchRegisteredModels = async (data: any) =>
  {
    const response: any = await getBigIntJson({ relativeUrl: 'ajax-api/2.0/mlflow/registered-models/search', data });
    return response.registered_models;
  }

  /**
   * Search model versions
   */
  static searchModelVersions = (data: any) =>
    getJson({ relativeUrl: 'ajax-api/2.0/mlflow/model-versions/search', data });

  /**
   * Get individual registered model
   */
  static getRegisteredModel = (data: any) =>
    getJson({ relativeUrl: 'ajax-api/2.0/mlflow/registered-models/get', data });

  /**
   * Get individual model version
   */
  static getModelVersion = (data: any) => getJson({ relativeUrl: 'ajax-api/2.0/mlflow/model-versions/get', data });

  /**
   * Set model version alias
   */
  static setModelVersionAlias = (data: { name: string; version: string; alias: string }) =>
    postJson({ relativeUrl: 'ajax-api/2.0/mlflow/registered-models/alias', data });

  /**
   * Delete model version alias
   */
  static deleteModelVersionAlias = (data: { name: string; version: string; alias: string }) =>
    deleteJson({ relativeUrl: 'ajax-api/2.0/mlflow/registered-models/alias', data });
}
