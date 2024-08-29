import { IPayload, IPayloadCreator } from "../types";

export const fetchSize = 25;


export const payloadCreator = ({
  pageParam,
  fetchSize,
  columnFilters,
  globalFilter,
  sorting,
}: IPayloadCreator): IPayload =>( {
  start: `${(pageParam as number) * fetchSize}`,
  size: `${fetchSize}`,
  filters: JSON.stringify(columnFilters ?? []),
  globalFilter: globalFilter ?? '',
  sorting: JSON.stringify(sorting ?? []),
}
)