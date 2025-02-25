import { Table, TableCell, TableHeader, TableRow, Typography } from '@databricks/design-system';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PageContainer } from '../../common/components/PageContainer';
import { ScrollablePageWrapper } from '../../common/components/ScrollablePageWrapper';
import ErrorUtils from '../../common/utils/ErrorUtils';
import { Link } from '../../common/utils/RoutingUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';
import { useExperimentAgGridTableStyles } from '../../experiment-tracking/components/experiment-page/components/runs/ExperimentViewRunsTable';
import { ModelListFilters } from '../../model-registry/components/model-list/ModelListFilters';
import { PageHeader } from '../../shared/building_blocks/PageHeader';
import { Spacer } from '../../shared/building_blocks/Spacer';

const data = [
  { id: '1', name: 'Model1', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
  { id: '2', name: 'Model2', status: 'Deployed', accuracy: '0.34', f1: '0.78' },
  { id: '3', name: 'Model3', status: 'Deployed', accuracy: '0.90', f1: '0.78' },
  { id: '4', name: 'Model4', status: 'Deployed', accuracy: '0.94', f1: '0.78' },
  { id: '5', name: 'Model5', status: 'Deployed', accuracy: '0.95', f1: '0.78' },
  { id: '6', name: 'Model6', status: 'Deployed', accuracy: '0.88', f1: '0.78' },
  { id: '7', name: 'Model7', status: 'Deployed', accuracy: '0.95', f1: '0.78' },
  { id: '8', name: 'Model8', status: 'Deployed', accuracy: '0.82', f1: '0.78' },
  { id: '9', name: 'Model9', status: 'Deployed', accuracy: '0.78', f1: '0.78' },
  { id: '10', name: 'Model10', status: 'Deployed', accuracy: '0.33', f1: '0.78' },
];

const columns: ColumnDef<LabelingEntity>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Model Name',
    cell: ({ getValue }) => <Link to={`/labels/${getValue()}`}>{getValue()}</Link>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'accuracy',
    header: 'Accuracy',
  },
  {
    accessorKey: 'f1',
    header: 'F1',
  },
];

interface LabelingEntity {
  id: string;
  name: string;
  status: string;
  accuracy: string;
  f1: string;
}

function Labeling() {
  // prop destruction
  // lib hooks
  const gridStyles = useExperimentAgGridTableStyles();

  const table = useReactTable<LabelingEntity>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: ({ id }) => id,
  });

  // state, ref hooks
  const [searchInput, setSearchInput] = useState('');

  // query hooks
  // calculated values

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

        <Table>
          <TableRow isHeader>
            {table.getLeafHeaders().map((header) => (
              <TableHeader
                componentId="codegen_mlflow_app_src_model-registry_components_model-list_modellisttable.tsx_412"
                key={header.id}
                multiline
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeader>
            ))}
          </TableRow>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell multiline key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
        {/* <div className="ag-theme-balham ag-grid-sticky" css={[gridStyles, { display: 'block', height: '100%' }]}>
          <MLFlowAgGridLoader columnDefs={columns} rowData={data} />
        </div> */}
      </PageContainer>
    </ScrollablePageWrapper>
  );
}

const LabelingPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, Labeling);

export default LabelingPage;
