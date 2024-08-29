import type { IChildren } from '@/resources/types';

const DashboardLayout = ({ children }: IChildren) => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
);
export default DashboardLayout;