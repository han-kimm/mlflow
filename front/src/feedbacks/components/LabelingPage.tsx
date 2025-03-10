import { Table, TableCell, TableHeader, TableRow, Typography } from '@databricks/design-system';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PageContainer } from '../../common/components/PageContainer';
import { ScrollablePageWrapper } from '../../common/components/ScrollablePageWrapper';
import ErrorUtils from '../../common/utils/ErrorUtils';
import { Link } from '../../common/utils/RoutingUtils';
import { withErrorBoundary } from '../../common/utils/withErrorBoundary';
import { PageHeader } from '../../shared/building_blocks/PageHeader';
import { Spacer } from '../../shared/building_blocks/Spacer';
import { Services } from '../services';

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

  // state, ref hooks

  // query hooks
  const { data, isLoading } = useQuery(['labels'], () =>
    Services.searchRegisteredModels({
      filter: '',
      max_result: 25,
    }),
  );
  // calculated values
  const columns: ColumnDef<LabelingEntity>[] = useMemo(
    () => [
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
    ],
    [],
  );

  const table = useReactTable<LabelingEntity>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: ({ id }) => id,
  });

  // effects
  // handlers

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

        {isLoading || (
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
        )}
      </PageContainer>
    </ScrollablePageWrapper>
  );
}

const LabelingPage = withErrorBoundary(ErrorUtils.mlflowServices.LABELS, Labeling);

export default LabelingPage;
