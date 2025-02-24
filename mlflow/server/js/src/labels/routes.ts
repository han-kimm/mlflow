import { createMLflowRoutePath } from '../common/utils/RoutingUtils';

// Route path definitions (used in defining route elements)
export class LabelingRoutePaths {
  static get labelListPage() {
    return createMLflowRoutePath('/labels');
  }
}

// Concrete routes and functions for generating parametrized paths
export class LabelingRoutes {
  static get labelListPageRoute() {
    return LabelingRoutePaths.labelListPage;
  }
}

export const PANES = Object.freeze({
  DETAILS: 'details',
  SERVING: 'serving',
});
