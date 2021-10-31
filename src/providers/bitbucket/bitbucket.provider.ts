import qs from 'qs';
import axios from 'axios';
import config from '@config';
import { ICreateRepositoryParams, IProject } from 'interfaces/IBitbucket';

export class BitbucketProvider {
  public async getAuthToken(): Promise<any> {
    try {
      const response = await axios({
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
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createProject(token: string, projectParams: IProject): Promise<any> {
    try {
      const response = await axios({
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
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createRepository(token: string, params: ICreateRepositoryParams): Promise<any> {
    try {
      const repoSlug = params.repository.name.toLowerCase().replace(/ /g, '-');
      const response = await axios({
        method: 'post',
        url: `https://api.bitbucket.org/2.0/repositories/${config.bitbucket.worspace}/${repoSlug}`,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        data: {
          name: params.repository.name,
          is_private: true,
          description: params.repository.description,
          language: params.repository.language,
          project: {
            key: params.project.key
          }
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}