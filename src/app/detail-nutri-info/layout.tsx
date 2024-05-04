'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { Header } from '@/commons/components/header/header';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';
import AuthLayout from '@/commons/layouts/auth-layout';

export default function ModiLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  const onLeftClick = () => {
    push(PATHS.메인);
  };
  return (
    <MobileViewLayout>
      <AuthLayout>
        <Header
          leftSideButton={
            <button className="flex h-full w-[16px] items-center " onClick={onLeftClick}>
              <ArrowLeft />
            </button>
          }
        />
        {children}
      </AuthLayout>
    </MobileViewLayout>
  );
}
