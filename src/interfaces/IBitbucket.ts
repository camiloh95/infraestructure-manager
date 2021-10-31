export type IProject = {
  key: string;
  name: string;
  description: string;
}

export type IRepository = {
  name: string;
  language: string;
  description: string;
}

export interface ICreateRepositoryParams {
  project: IProject;
  repository: IRepository;
}