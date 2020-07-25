import React, { useState, useEffect } from "react";
import { Line } from "chart.js";

function LineGraph() {
	const [data, setData] = useState({});

	const buildChartData = (data, casesType = "cases") => {
		const chartData = [];
		let lastDataPoint;

		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				};
				chartData.push(newDataPoint);
			}
		}

		return chartData;
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://disease.sh/v3/covid-19/historical/all?lastdays=30"
			);
			const data = await response.json();
			console.log(data);

			const chartData = buildChartData(data);
			setData(chartData);
		})();
	}, []);
	return (
		<div>
			<Line
				data={{
					datasets: [
						{
							data,
							backgroundColor: "rgba(204,16,52,0.5)",
							borderColor: "#cc1034",
						},
					],
				}}
			/>
		</div>
	);
}

export default LineGraph;
