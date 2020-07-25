import React, { memo } from "react";
import { prettyPrintStat } from "../util";
import numeral from "numeral";

function List({ countries }) {
	return (
		<ul className="list">
			{countries.map(({ country, cases }) => (
				<li className="list__item" key={country}>
					<span>{country}</span>
					<span>
						<strong>{numeral(cases).format("0,0")}</strong>
					</span>
				</li>
			))}
		</ul>
	);
}

export default memo(List);
