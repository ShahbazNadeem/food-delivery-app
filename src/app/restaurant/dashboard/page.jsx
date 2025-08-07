'use client';

import Layout from '@components/layout/Layout';
import React, { useEffect } from 'react';
import DashboardMain from '@components/DashboardMain';
import { useRestaurantAdmin } from '@/context/RestaurantAdminContext';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { restaurantUser } = useRestaurantAdmin();

  useEffect(() => {
    document.title = 'Dashboard';

    if (!restaurantUser) {
      router.push('/restaurant');
    }
  }, [restaurantUser]);

  if (!restaurantUser) {
    return null;
  }

  return (
    <Layout>
      <DashboardMain />
    </Layout>
  );
};

export default Page;
