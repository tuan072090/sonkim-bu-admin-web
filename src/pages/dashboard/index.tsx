import React from "react";
import {
    AreaChartCpn,
    BarChartCpn,
    Box,
    Layout,
    LineChartCpn,
    PieChartCpn,
} from "../../components";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const dataPieChart = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

const DashboardPage = Layout(() => {
    return (
        <div className="p-3">
            <div className="grid grid-flow-col grid-col-2 grid-rows-2 gap-4">
                <Box>
                    <h3 className="mb-3 text-base text-black font-bold">
                        Line chart
                    </h3>
                    <LineChartCpn data={data} />
                </Box>
                <Box>
                    <h3 className="mb-3 text-base text-black font-bold">
                        Bar chart
                    </h3>
                    <BarChartCpn data={data} />
                </Box>
                <Box>
                    <h3 className="mb-3 text-base text-black font-bold">
                        Pie chart
                    </h3>
                    <PieChartCpn data={dataPieChart} />
                </Box>
                <Box>
                    <h3 className="mb-3 text-base text-black font-bold">
                        Area chart
                    </h3>
                    <AreaChartCpn data={data} />
                </Box>
            </div>
        </div>
    );
});

export default DashboardPage;
