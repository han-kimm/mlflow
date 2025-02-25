import ErrorUtils from '../../common/utils/ErrorUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';

function LabelModelView() {
  return <div>timestamp</div>;
}

const LabelModelPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, LabelModelView);

export default LabelModelPage;
