import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalState from './context';

test('renders FoodRecipe app', () => {
  render(
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/FoodRecipe/i);
  expect(titleElement).toBeInTheDocument();
});
