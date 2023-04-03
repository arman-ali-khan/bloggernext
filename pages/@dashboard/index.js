import Link from 'next/link';
import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import DashboardLayout from '../../Layout/DashboardLayout';

const index = () => {
    return (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
    );
};

export default index;