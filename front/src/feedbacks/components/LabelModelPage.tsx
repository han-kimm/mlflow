import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PageContainer } from '../../common/components/PageContainer';
import { ScrollablePageWrapper } from '../../common/components/ScrollablePageWrapper';
import ErrorUtils from '../../common/utils/ErrorUtils';
import { Link, useParams } from '../../common/utils/RoutingUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';
import { PageHeader } from '../../shared/building_blocks/PageHeader';
import { LabelingRoutes } from '../routes';
import F1ScoreVisualization from './F1Score';
import { Button } from '@databricks/design-system';

function LabelModelView() {
  // prop destruction

  // lib hooks
  const { modelName } = useParams();

  // state, ref hooks
  const [labelMode, setLabelMode] = useState(false);

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
        <PageHeader title={modelName} breadcrumbs={breadcrumbs}>
          <Button
            componentId="label-model-view-switch"
            onClick={() => {
              setLabelMode((prev) => !prev);
            }}
            type="primary"
          >
            {labelMode ? 'Evaluation' : 'Label'}
          </Button>
        </PageHeader>
        {labelMode && <div>Labeling</div>}
        {labelMode || (
          <F1ScoreVisualization
            data={[
              { id: '1', label: 'tire', humanLabel: 'tire' },
              { id: '2', label: 'other', humanLabel: 'tire' },
              { id: '3', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '4', label: 'other', humanLabel: 'other' },
              { id: '5', label: 'tire', humanLabel: 'tire' },
              { id: '6', label: 'other', humanLabel: 'tire' },
              { id: '7', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '8', label: 'other', humanLabel: 'other' },
              { id: '9', label: 'tire', humanLabel: 'tire' },
              { id: '10', label: 'other', humanLabel: 'tire' },
              { id: '11', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '12', label: 'other', humanLabel: 'other' },
              { id: '13', label: 'tire', humanLabel: 'tire' },
              { id: '14', label: 'other', humanLabel: 'tire' },
              { id: '15', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '16', label: 'other', humanLabel: 'other' },
              { id: '17', label: 'tire', humanLabel: 'tire' },
              { id: '18', label: 'other', humanLabel: 'tire' },
              { id: '19', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '20', label: 'other', humanLabel: 'other' },
              { id: '21', label: 'tire', humanLabel: 'tire' },
              { id: '22', label: 'other', humanLabel: 'tire' },
              { id: '23', label: 'other', humanLabel: 'cardboard' },
              { id: '24', label: 'other', humanLabel: 'other' },
              { id: '25', label: 'tire', humanLabel: 'tire' },
              { id: '26', label: 'other', humanLabel: 'tire' },
              { id: '27', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '28', label: 'other', humanLabel: 'other' },
              { id: '29', label: 'tire', humanLabel: 'tire' },
              { id: '30', label: 'other', humanLabel: 'tire' },
              { id: '31', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '32', label: 'cardboard', humanLabel: 'other' },
              { id: '33', label: 'tire', humanLabel: 'tire' },
              { id: '34', label: 'other', humanLabel: 'tire' },
              { id: '35', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '36', label: 'other', humanLabel: 'other' },
              { id: '37', label: 'tire', humanLabel: 'tire' },
              { id: '38', label: 'other', humanLabel: 'tire' },
              { id: '39', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '40', label: 'other', humanLabel: 'other' },
              { id: '41', label: 'tire', humanLabel: 'tire' },
              { id: '42', label: 'other', humanLabel: 'tire' },
              { id: '43', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '44', label: 'other', humanLabel: 'other' },
              { id: '45', label: 'tire', humanLabel: 'tire' },
              { id: '46', label: 'other', humanLabel: 'tire' },
              { id: '47', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '48', label: 'other', humanLabel: 'other' },
              { id: '49', label: 'tire', humanLabel: 'tire' },
              { id: '50', label: 'other', humanLabel: 'tire' },
              { id: '51', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '52', label: 'other', humanLabel: 'other' },
              { id: '53', label: 'tire', humanLabel: 'tire' },
              { id: '54', label: 'other', humanLabel: 'tire' },
              { id: '55', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '56', label: 'other', humanLabel: 'other' },
              { id: '57', label: 'tire', humanLabel: 'tire' },
              { id: '58', label: 'other', humanLabel: 'tire' },
              { id: '59', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '60', label: 'other', humanLabel: 'other' },
              { id: '61', label: 'tire', humanLabel: 'tire' },
              { id: '62', label: 'other', humanLabel: 'tire' },
              { id: '63', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '64', label: 'other', humanLabel: 'other' },
              { id: '65', label: 'tire', humanLabel: 'tire' },
              { id: '66', label: 'other', humanLabel: 'tire' },
              { id: '67', label: 'cardboard', humanLabel: 'cardboard' },
              { id: '68', label: 'tire', humanLabel: 'other' },
              { id: '69', label: 'tire', humanLabel: 'tire' },
              { id: '70', label: 'other', humanLabel: 'tire' },
              { id: '71', label: 'cardboard', humanLabel: 'cardboard' },
            ]}
          />
        )}
      </PageContainer>
    </ScrollablePageWrapper>
  );
}

const LabelModelPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, LabelModelView);

export default LabelModelPage;
