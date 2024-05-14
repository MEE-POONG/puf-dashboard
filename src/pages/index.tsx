import StatusCard from "@/components/Home/StatusCard";
import DashboardLayout from "@/components/Layout";
import React from "react";

const Home: React.FC = (props) => {
  return (
    <DashboardLayout>
      <div className="">
        <StatusCard />
      </div>
    </DashboardLayout>
  );
}
export default Home;
