import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function PokemonCard({ url, name }) {
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setPokemon(data);
				// console.log(data.abilities[0].ability.name);
			});
	}, [url]);

	return (
		<>
			{pokemon && (
				<Card>
					<Card.Img src={pokemon?.sprites.front_default} />
					<Card.Body>
						<Card.Title>{pokemon?.name.toUpperCase()}</Card.Title>
						<Card.Text as="div">
							<ul>
								{pokemon.abilities.map((ability, index) => {
									return <li key={index}>{ability.ability.name}</li>;
								})}
							</ul>
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</>
	);
}

export { PokemonCard };
