import { BitbucketProvider } from '@providers/bitbucket/bitbucket.provider';

export class RepositoryService {
  public async createRepository(params: any) {
    const aBitbucketProvider = new BitbucketProvider();

    const token = await aBitbucketProvider.getAuthToken();
    await aBitbucketProvider.createProject(token.access_token, params.project);
    const repository = await aBitbucketProvider.createRepository(token.access_token, params);

    return { data: repository };
  }
}