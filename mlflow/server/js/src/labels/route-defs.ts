import { createLazyRouteElement } from '../common/utils/RoutingUtils';

import { LabelingRoutePaths } from './routes';
export const getLabelingRouteDefs = () => [
  {
    path: LabelingRoutePaths.labelListPage,
    element: createLazyRouteElement(() => import('./components/LabelingPage')),
    pageId: 'mlflow.labeling.label-list',
  },
];
