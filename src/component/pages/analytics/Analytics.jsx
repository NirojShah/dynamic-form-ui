import React, { useEffect, useState } from "react";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsCharts from "./AnalyticsCharts";
import RecentForms from "./RecentForms";
import RecentResponses from "./RecentResponses";
import QuickActions from "./QuickActions";
import analyticsApis from "../../../utility/analytics.api";


const Analytics = () => {

    const [stats, setStats] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [responses, setResponses] = useState([]);
    const [forms, setforms] = useState([]);
    const [performance, setPerformance] = useState([]);

    const fetchAnalysisData = async () => {
        const statsInfo = await analyticsApis.fetchStats()
        const formInfo = await analyticsApis.fetchFormInfos()
        const responseInfo = await analyticsApis.fetchResponseInfos()
        const chartInfo = await analyticsApis.fetchChartInfos()
        const performanceInfo = await analyticsApis.fetchPerformance()

        if (statsInfo.success) {
            setStats(statsInfo.data.headers)
        }
        if (chartInfo.success) {
            setChartData(chartInfo.data)
        }
        if (responseInfo.success) {
            setResponses(responseInfo.data)
        }
        if (formInfo.success) {
            setforms(formInfo.data)
        }

        if (performanceInfo.success) {
            setPerformance(performanceInfo.data)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAnalysisData()

    }, [])

    return (
        <div className="min-h-screen bg-[#f7f8f5] p-6">
            <AnalyticsHeader />

            <AnalyticsStats stats={stats} />

            <AnalyticsCharts chartData={chartData} perfomance={performance} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <RecentForms forms={forms} />
                <RecentResponses responses={responses} />
            </div>

            <QuickActions />
        </div>
    );
};

export default Analytics;