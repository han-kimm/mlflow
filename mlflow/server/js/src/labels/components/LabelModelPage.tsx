import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PageContainer } from '../../common/components/PageContainer';
import { ScrollablePageWrapper } from '../../common/components/ScrollablePageWrapper';
import ErrorUtils from '../../common/utils/ErrorUtils';
import { Link, useParams } from '../../common/utils/RoutingUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';
import { PageHeader } from '../../shared/building_blocks/PageHeader';
import { LabelingRoutes } from '../routes';

function LabelModelView() {
  // prop destruction

  // lib hooks
  const { modelName } = useParams();

  // state, ref hooks

  // query hooks

  // calculated values
  const breadcrumbs = useMemo(
    () => [
      <Link to={LabelingRoutes.labelListPageRoute}>
        <FormattedMessage
          defaultMessage="Labeling List"
          description="Text for link back to labeling page under the header on the label model view page"
        />
      </Link>,
    ],
    [],
  );

  // effects

  // handlers

  return (
    <ScrollablePageWrapper>
      <PageContainer>
        <PageHeader title={modelName} breadcrumbs={breadcrumbs} />
      </PageContainer>
    </ScrollablePageWrapper>
  );
}

const LabelModelPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, LabelModelView);

export default LabelModelPage;
