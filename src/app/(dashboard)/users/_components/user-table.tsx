'use client';

import { type UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
  MRT_ColumnDef,
} from 'material-react-table';

import { Typography } from '@mui/material';
import { queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { User, UserApiResponse } from '@/app/(dashboard)/users/types';
import { getUsersColumnList, getUsersList } from '../_actions/user-actions';
import { payloadCreator } from './user-table-config';

const fetchSize = 25;

const UsersComponent = ({ firstLoadData, initialColumnData }: { firstLoadData?: UserApiResponse, initialColumnData?: MRT_ColumnDef<User>[] }) => {
  const initialData = useMemo(
    () => (firstLoadData ? { pages: [firstLoadData], pageParams: [0] } : undefined),
    [firstLoadData],
  );
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);


  const payload = payloadCreator({
    pageParam: 0,
    fetchSize,
    columnFilters,
    globalFilter,
    sorting,
  })

  const { data: columnsData } = useQuery<MRT_ColumnDef<User>[]>({
    initialData: initialColumnData,
    queryKey: ['columns'],
    queryFn: () => getUsersColumnList('user'),
  });

  const columns = useMemo(() => columnsData ?? [], [columnsData]);
  const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<UserApiResponse>({
    initialData,
    queryKey: ['table-data', columnFilters, globalFilter, sorting],
    queryFn: () => getUsersList(payload),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, columnFilters, globalFilter]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useMaterialReactTable({
    columns,
    data: flatData,
    enablePagination: false,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    manualFiltering: true,
    manualSorting: true,
    columnResizeDirection: 'ltr',
    muiTableContainerProps: {
      ref: tableContainerRef,
      sx: { maxHeight: '600px' },
      onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => (
      <Typography>
        Fetched {totalFetched} of {totalDBRowCount} total rows.
      </Typography>
    ),
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 4 },
  });

  return <MaterialReactTable table={table} />;
};

export default UsersComponent