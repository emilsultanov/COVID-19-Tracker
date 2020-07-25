import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, isRed, active, ...props }) {
	return (
		<Card
			className={`infoBox ${active && "infoBox_selected"} ${
				isRed && "infoBox_red"
			}`}
			onClick={props.onClick}
		>
			<CardContent>
				<Typography className="infobox__title" color="textSecondary">
					{title}
				</Typography>
				<h2
					className={`infoBox__cases ${!isRed && "infoBox__cases_green"}`}
				>
					{cases}
				</h2>
				<Typography className="infoBox__total" color="textSecondary">
					{total}Total
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
