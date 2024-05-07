import DashboardLayout from "@/components/Layout";
import React from "react";

const Agent: React.FC = (props) => {
    return (
        <DashboardLayout>
            <div className="flex flex-wrap my-5 -mx-2">
                <div className="w-full lg:w-1/3 p-2">
                    Agent
                </div>
            </div>
        </DashboardLayout>
    );
}
export default Agent;
