import ErrorUtils from '../../common/utils/ErrorUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';

function Labeling() {
  return (
    <div>
      <h1>Labeling Page</h1>
    </div>
  );
}

const LabelingPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, Labeling);

export default LabelingPage;
