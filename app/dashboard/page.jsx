import React from "react";
import DashboardLayout from "../layouts/dashboard-layout";
import NewInterviewForm from "@/components/NewInterviewForm";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-10">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <h2 className="text-gray-500">Create and Start Your AI Mockup Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5">
          <NewInterviewForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
