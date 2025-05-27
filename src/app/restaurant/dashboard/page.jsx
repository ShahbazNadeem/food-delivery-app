import Layout from '@components/layout/Layout'
import React from 'react'
import DashboardMain from '@components/DashboardMain';
import AddFoodItems from '@components/AddFoodItems';

export const metadata = {
  title: 'Dashboard',
  description: 'Login or sign up to access the Restaurant app.',
};

const page = () => {

  return (
    <Layout>
      <DashboardMain/>
    </Layout>
  )
}

export default page