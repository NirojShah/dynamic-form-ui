import React from "react";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsCharts from "./AnalyticsCharts";
import RecentForms from "./RecentForms";
import RecentResponses from "./RecentResponses";
import QuickActions from "./QuickActions";

const stats = [
    {
        label: "Total Forms",
        value: 24,
        growth: "+12%",
    },
    {
        label: "Responses",
        value: 1284,
        growth: "+18%",
    },
    {
        label: "Active Forms",
        value: 12,
        growth: "+6%",
    },
    {
        label: "Conversion",
        value: "82%",
        growth: "+4%",
    },
];

const forms = [
    {
        id: 1,
        name: "Hiring Form",
        responses: 120,
        status: "Active",
    },
    {
        id: 2,
        name: "Feedback Survey",
        responses: 340,
        status: "Active",
    },
    {
        id: 3,
        name: "Employee Onboarding",
        responses: 89,
        status: "Draft",
    },
];

const responses = [
    {
        id: 1,
        user: "Niroj Shah",
        form: "Hiring Form",
        time: "2 min ago",
    },
    {
        id: 2,
        user: "Amit Kumar",
        form: "Feedback Survey",
        time: "10 min ago",
    },
    {
        id: 3,
        user: "Priya Singh",
        form: "Hiring Form",
        time: "1 hour ago",
    },
];

const chartData = [
    { day: "Mon", responses: 40 },
    { day: "Tue", responses: 80 },
    { day: "Wed", responses: 55 },
    { day: "Thu", responses: 110 },
    { day: "Fri", responses: 92 },
    { day: "Sat", responses: 70 },
    { day: "Sun", responses: 120 },
];

const Analytics = () => {
    return (
        <div className="min-h-screen bg-[#f7f8f5] p-6">
            <AnalyticsHeader />

            <AnalyticsStats stats={stats} />

            <AnalyticsCharts chartData={chartData} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <RecentForms forms={forms} />
                <RecentResponses responses={responses} />
            </div>

            <QuickActions />
        </div>
    );
};

export default Analytics;