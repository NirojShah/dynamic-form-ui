import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
} from "recharts";

const AnalyticsCharts = ({ chartData }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* MAIN CHART */}
            <div className="xl:col-span-2 bg-white border border-black/10 rounded-2xl p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold">
                        Response Analytics
                    </h2>

                    <p className="text-sm text-gray-500">
                        Weekly response activity
                    </p>
                </div>

                <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <XAxis dataKey="day" />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="responses"
                                stroke="#163300"
                                fill="#9FE870"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* SIDE CARD */}
            <div className="bg-white border border-black/10 rounded-2xl p-5">
                <h2 className="text-lg font-semibold mb-5">
                    Performance
                </h2>

                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Form Completion</span>
                            <span>82%</span>
                        </div>

                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full w-[82%] bg-[#9FE870]" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>User Engagement</span>
                            <span>68%</span>
                        </div>

                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full w-[68%] bg-[#163300]" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Submission Rate</span>
                            <span>91%</span>
                        </div>

                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full w-[91%] bg-cyan-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;