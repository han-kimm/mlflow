import { Typography } from '@databricks/design-system';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PageContainer } from '../../common/components/PageContainer';
import { ScrollablePageWrapper } from '../../common/components/ScrollablePageWrapper';
import ErrorUtils from '../../common/utils/ErrorUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';
import { useExperimentAgGridTableStyles } from '../../experiment-tracking/components/experiment-page/components/runs/ExperimentViewRunsTable';
import { ModelListFilters } from '../../model-registry/components/model-list/ModelListFilters';
import { PageHeader } from '../../shared/building_blocks/PageHeader';
import { Spacer } from '../../shared/building_blocks/Spacer';
import { MLFlowAgGridLoader } from '../../common/components/ag-grid/AgGridLoader';
import { ColDef } from '@ag-grid-community/core';
import { Link } from '../../common/utils/RoutingUtils';

function Labeling() {
  // prop destruction
  // lib hooks
  const gridStyles = useExperimentAgGridTableStyles();

  // state, ref hooks
  const [searchInput, setSearchInput] = useState('');

  // query hooks
  // calculated values
  const data = [
    { name: 'Model1', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model2', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model3', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model4', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model5', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model6', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model7', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model8', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model9', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
    { name: 'Model10', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
  ].filter((model) => model.name.toLowerCase().includes(searchInput.toLowerCase()));

  const columns: ColDef<typeof data>[] = [
    {
      field: 'name',
      headerName: 'Model Name',
      sortable: true,
      cellRenderer: ({ value }: any) => <Link to={`/labels/${value}`}>{value}</Link>,
    },
    {
      field: 'status',
      headerName: 'Deploy Status',
      sortable: true,
    },
    {
      field: 'accuracy',
      headerName: 'Accuracy',
      width: 120,
      sortable: true,
    },
    {
      field: 'f1',
      headerName: 'F1',
      width: 120,
      sortable: true,
    },
  ];

  // effects
  // handlers
  const handleSearch = useCallback((event: any, searchInput: any) => {
    event?.preventDefault();
    setSearchInput(searchInput);
  }, []);

  return (
    <ScrollablePageWrapper>
      <PageContainer usesFullHeight>
        <PageHeader title="Labeling" spacerSize="xs" />
        <Typography.Hint>
          <FormattedMessage
            defaultMessage="Human label for evaluation of model in production"
            description="Labeling page"
          />
        </Typography.Hint>
        <Spacer />

        <ModelListFilters
          searchFilter={searchInput}
          onSearchFilterChange={(value) => handleSearch(null, value)}
          isFiltered={Boolean(searchInput)}
        />

        <div className="ag-theme-balham ag-grid-sticky" css={[gridStyles, { display: 'block', height: '100%' }]}>
          <MLFlowAgGridLoader columnDefs={columns} rowData={data} />
        </div>
      </PageContainer>
    </ScrollablePageWrapper>
  );
}

const LabelingPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, Labeling);

export default LabelingPage;
