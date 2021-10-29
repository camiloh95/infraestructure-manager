import qs from 'qs';
import axios from 'axios';
import config from '@config';

export class BitbucketProvider {
  public async getAuthToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          baseURL: 'https://bitbucket.org/',
          url: '/site/oauth2/access_token',
          auth: {
            username: config.bitbucket.clientId,
            password: config.bitbucket.clientSecret
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify({
            grant_type: 'client_credentials',
          }),
        })
        .then((res:any) => {
          resolve(res.data);
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  }

  public async createProject(token: string, projectParams: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url: `https://api.bitbucket.org/2.0/workspaces/${config.bitbucket.worspace}/projects/`,
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: {
            key: projectParams.key,
            name: projectParams.name,
            description: projectParams.description
          }
        })
        .then((res:any) => {
          resolve(res.data);
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  }

  public async createRepository(token: string, repositoryParams: any, projectKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url: `https://api.bitbucket.org/2.0/repositories/${config.bitbucket.worspace}`,
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: {
            name: repositoryParams.name,
            is_private: true,
            description: repositoryParams.description,
            language: repositoryParams.language,
            project: {
              key: projectKey
            }
          }
        })
        .then((res:any) => {
          resolve(res.data);
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  }
}