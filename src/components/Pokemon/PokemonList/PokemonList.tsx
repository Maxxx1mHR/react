// import { useContext } from 'react';

// import { getPokemon } from '../../Services/PokeService';
// import PokemonBaseInfo from '../PokemonBaseInfo/PokemonBaseInfo';
// import { IPokemon } from '../../../types';
// import { useSearchParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../state/store';
// import { pokemonsApi } from '../../../state/pokemon/pokemonsApi';

// export const PokemonList = () => {
//   // const { searchParams, setSearchParams, pokemonList, isBreak } =
//   //   useContext(PokemonContext) || {};
//   const [searchParams, setSearchParams] = useSearchParams();

//   // if (isBreak) {
//   //   throw Error('error!');
//   // }

//   const pokemonsList = useSelector(
//     (state: RootState) => state.pokemonList.pokemonsList
//   );
//   // console.log(pokemonsList);

//   return (
//     <div className="pokemon">
//       <ul className="pokemon__list">
//         {pokemonsList?.map((pokemon) => (
//           <li
//             data-testid="card-list"
//             key={pokemon.id}
//             className="pokemon__item"
//             onClick={async () => {
//               try {
//                 // setPokemonFullInfo?.(await getPokemon(pokemon.name));
//               } catch (err) {
//                 console.error(err);
//               }
//               setSearchParams({
//                 page: String(searchParams.get('page') || 1),
//                 details: pokemon.name,
//               });
//             }}
//           >
//             <div className="pokemon__info">
//               <PokemonBaseInfo pokemonFullInfo={pokemon} />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
