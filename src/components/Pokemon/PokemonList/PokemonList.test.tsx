// import { describe, expect, it } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import App from '../../App/App';
// import { server } from '../../../mocks/server';
// import { HttpResponse, http } from 'msw';

// describe('Tests for the Card List component:', () => {
//   it('Verify that the component renders the specified number of cards', async () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );
//     const pokemonList = await screen.findAllByTestId('card-list');
//     expect(pokemonList).toHaveLength(4);
//     screen.debug();
//   });

//   it('Check that an appropriate message is displayed if no cards are present', async () => {
//     server.use(
//       http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=4', () => {
//         return HttpResponse.json({
//           results: [],
//         });
//       })
//     );
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );
//     const notFound = await screen.findByText('Pokemon Not Found');
//     expect(notFound).toBeInTheDocument;
//   });
// });
