'use server'

import { IPayload, IPayloadCreator, UserApiResponse } from "../types";

export const getUsersList = async ({ filters, size, start, globalFilter, sorting, }: IPayload) => {
  console.log({ filters, size, start, globalFilter, sorting, })
  return {
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        state: 'CA',
        phoneNumber: '123-456-7890',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        address: '456 Elm St',
        state: 'NY',
        phoneNumber: '987-654-3210',
      },
    ],
    meta: {
      totalRowCount: 2,
    },
  };
}

export const getUsersColumnList = async (type: string) => {
  if (type === 'user') {

    return [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
    ]
  }
  return []
}