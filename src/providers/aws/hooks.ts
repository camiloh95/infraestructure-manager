export function getECSParameters(applicationName: string) {
  return [
    {
      ParameterKey: 'ApplicationName',
      ParameterValue: applicationName
    }
  ]
}