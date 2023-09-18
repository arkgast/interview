import { flow, map, flatMap, values } from 'lodash/fp';

type RequireContext = {
  <T>(path: string): T;
  keys: () => string[];
  resolve: (path: string) => string;
};

export const flatRequire = (requireContext: RequireContext) => {
  return flow([(rc) => rc.keys(), map(requireContext), flatMap(values)])(
    requireContext
  );
};
