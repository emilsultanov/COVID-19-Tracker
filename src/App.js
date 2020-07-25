import React, { useState, useEffect } from "react";
import "./App.css";
import {
	FormControl,
	Select,
	MenuItem,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import List from "./components/List";
import { sortData, prettyPrintStat } from "./util";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

function App() {
	const [country, setCountry] = useState("worldwide");
	const [countries, setCountries] = useState([]);
	const [countryInfo, setCountryInfo] = useState({});
	const [tableDate, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState(2);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	useEffect(() => {
		(async () => {
			const response = await fetch("https://disease.sh/v3/covid-19/all");
			const data = await response.json();
			setCountryInfo(data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://disease.sh/v3/covid-19/countries"
			);
			const data = await response.json();
			const sortedData = sortData(data);
			const countries = data.map((item) => ({
				name: item.country,
				value: item.countryInfo.iso2,
			}));
			setCountries(countries);
			setTableData(sortedData);
			setMapCountries(data);
		})();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		const response = await fetch(url);
		const data = await response.json();
		setCountry(countryCode);
		setCountryInfo(data);
		console.log(data);
		setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
		setMapZoom(5);
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select
							variant="outlined"
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value} key={country.name}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox
						isRed
						title="Coronavirus Cases"
						active={casesType === "cases"}
						onClick={(e) => setCasesType("cases")}
						total={prettyPrintStat(countryInfo.cases)}
						cases={prettyPrintStat(countryInfo.todayCases)}
					/>
					<InfoBox
						title="Recovered"
						active={casesType === "recovered"}
						onClick={(e) => setCasesType("recovered")}
						total={prettyPrintStat(countryInfo.recovered)}
						cases={prettyPrintStat(countryInfo.todayRecovered)}
					/>
					<InfoBox
						isRed
						title="Deaths"
						active={casesType === "deaths"}
						onClick={(e) => setCasesType("deaths")}
						total={prettyPrintStat(countryInfo.deaths)}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
					/>
				</div>
				<Map
					center={mapCenter}
					zoom={mapZoom}
					countries={mapCountries}
					casesType={casesType}
				/>
			</div>
			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<List countries={tableDate} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
