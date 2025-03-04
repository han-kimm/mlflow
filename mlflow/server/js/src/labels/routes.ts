import { createMLflowRoutePath, generatePath } from '../common/utils/RoutingUtils';

// Route path definitions (used in defining route elements)
export class LabelingRoutePaths {
  static get labelListPage() {
    return createMLflowRoutePath('/labels');
  }
  static get labelModelPage() {
    return createMLflowRoutePath('/labels/:modelName');
  }
}

// Concrete routes and functions for generating parametrized paths
export class LabelingRoutes {
  static get labelListPageRoute() {
    return LabelingRoutePaths.labelListPage;
  }
  static labelModelPageRoute(modelName: string) {
    return generatePath(LabelingRoutePaths.labelModelPage, {
      modelName: encodeURIComponent(modelName),
    });
  }
}

export const PANES = Object.freeze({
  DETAILS: 'details',
  SERVING: 'serving',
});
