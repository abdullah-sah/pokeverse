import React, { useEffect, useRef, useState } from "react";
import { Container, Form, InputGroup, Row } from "react-bootstrap";
import { Navigation } from "./components/Navigation";
import { PokemonCard } from "./components/PokemonCard";
import fetchPokemon from "./utils/fetchPokemon";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState([]);
	const inputRef = useRef("");

	const handleChange = () => {
		const filter = pokemonList.filter((pokemon) => {
			return pokemon.name
				.toLowerCase()
				.includes(inputRef.current.value.toLowerCase());
		});
		setFilteredPokemonList(filter);
		console.log(filteredPokemonList);
	};

	useEffect(() => {
		fetchPokemon(pokeApi).then((data) => {
			setPokemonList(data);
			setFilteredPokemonList(data);
		});
	}, []);

	return (
		<div>
			<Container>
				<Row>
					<Navigation />
				</Row>

				<InputGroup>
					<Form.Control
						onChange={handleChange}
						ref={inputRef}
						placeholder="Enter Pokemon name"
					/>
				</InputGroup>

				<h1>Pokemon should appear here</h1>

				{filteredPokemonList &&
					filteredPokemonList.map((value, index) => {
						return (
							<PokemonCard url={value.url} name={value.name} key={index} />
						);
					})}
			</Container>
		</div>
	);
}

export { App };
// 