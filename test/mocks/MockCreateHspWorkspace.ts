export const MockCreateHspWorkspace = function createHspWorkspace(
  _setup: unknown
) {
  const resources: unknown[] = [];
  const result = {
    async mount(_: unknown) {
      return result;
    },
    unmount() {
      resources.splice(0, resources.length);
      return result;
    },
    addResource(resource: unknown) {
      resources.push(resource);
    },
    getResources() {
      return resources;
    },
  };
  return result;
};
