import type { IChildren } from '@/resources/types';

export default function SiteLayout({ children }: IChildren) {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>;
}
