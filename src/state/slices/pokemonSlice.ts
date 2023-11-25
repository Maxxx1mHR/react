import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPokemon } from '../../types';

const initialState = {
  pokemon: <IPokemon>{},
  pokemonsList: <IPokemon[]>[],
  pokemonChosenName: '',
};

const pokemonListSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<IPokemon>) => {
      state.pokemonsList.push(action.payload);
    },
    setPokemon: (state, action: PayloadAction<IPokemon>) => {
      state.pokemon = action.payload;
    },
    setPokemonName: (state, action: PayloadAction<string>) => {
      state.pokemonChosenName = action.payload;
    },
    // setPokemonAsync: (state, action: PayloadAction<IPokemon>) => {
    //   state.pokemonList.push(action.payload);
    // },
  },
  // extraReducers(builder) {
  //   builder.addCase(
  //     setPokemonAsync.fulfilled,
  //     (state, action: PayloadAction<IPokemon>) => {
  //       state.pokemonList.push(action.payload);
  //     }
  //   );
  // },
});

// export const setPokemonAsync = createAsyncThunk(
//   'pokemon/setPokemonAsync',
//   async (pokemon: IPokemon) => {
//     return pokemon;
//   }
// );

export const { setPokemonList, setPokemon, setPokemonName } =
  pokemonListSlice.actions;

export default pokemonListSlice.reducer;
