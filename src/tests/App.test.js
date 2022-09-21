import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from './helpers/testData';
import App from '../App';

describe('test Table component', () => {
  it('renders Table component', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const linkElement = screen.getByRole('table');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('test Filters component', () => {
  it('renders Filters component', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const searchInput = screen.getByRole('textbox', {
      name: /filtrar por nome:/i,
    });
    expect(searchInput).toBeInTheDocument();
  });

  it('filter when typing', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const searchInput = screen.getByRole('textbox', {
      name: /filtrar por nome:/i,
    });
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
    userEvent.type(searchInput, 'oo');
    expect(searchInput.value).toBe('oo');
    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(3);
  });

  it('filter when change column filter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByRole('combobox', {
      name: /filtrar por coluna:/i,
    });
    const comparationFilter = screen.getByRole('combobox', {
      name: /comparação:/i,
    });
    const valueFilter = screen.getByRole('spinbutton', { name: /valor:/i });
    const applyFilter = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparationFilter, 'maior que');
    userEvent.type(valueFilter, '100000');
    userEvent.click(applyFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(8);
  });

  it('remove added filter when click on X', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByRole('combobox', {
      name: /filtrar por coluna:/i,
    });
    const comparationFilter = screen.getByRole('combobox', {
      name: /comparação:/i,
    });
    const valueFilter = screen.getByRole('spinbutton', { name: /valor:/i });
    const applyFilter = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparationFilter, 'menor que');
    userEvent.type(valueFilter, '100000');
    userEvent.click(applyFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(2);

    const removeFilter = screen.getByRole('button', { name: /x/i });
    expect(removeFilter).toBeInTheDocument();
    userEvent.click(removeFilter);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
  });

  it('remove all filter when click in remove all filters button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByRole('combobox', {
      name: /filtrar por coluna:/i,
    });
    const comparationFilter = screen.getByRole('combobox', {
      name: /comparação:/i,
    });
    const valueFilter = screen.getByRole('spinbutton', { name: /valor:/i });
    const applyFilter = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparationFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(applyFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(2);

    const removeAllFilters = screen.getByRole('button', {
      name: /remover todos os filtros/i,
    });
    expect(removeAllFilters).toBeInTheDocument();
    userEvent.click(removeAllFilters);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
  });

  it('render order filter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const orderInput = screen.getByRole('combobox', { name: /ordenar por:/i });
    expect(orderInput).toBeInTheDocument();
  });
});

describe('test OrderFilter component', () => {
  it('change inputs correctly', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const orderSelect = screen.getByRole('combobox', { name: /ordenar por:/i });
    const orderTypeAsc = screen.getByRole('radio', { name: /ascendente/i });
    const orderTypeDesc = screen.getByRole('radio', { name: /descendente/i });

    userEvent.selectOptions(orderSelect, 'population');
    expect(orderSelect.value).toBe('population');

    userEvent.click(orderTypeAsc);
    expect(orderTypeAsc.checked).toBe(true);

    userEvent.click(orderTypeDesc);
    expect(orderTypeDesc.checked).toBe(true);
  });

  it('order when click in order button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const orderSelect = screen.getByRole('combobox', { name: /ordenar por:/i });
    const orderTypeAsc = screen.getByRole('radio', { name: /ascendente/i });
    const orderButton = screen.getByRole('button', { name: /ordenar/i });

    userEvent.selectOptions(orderSelect, 'population');
    expect(orderSelect.value).toBe('population');

    userEvent.click(orderTypeAsc);
    expect(orderTypeAsc.checked).toBe(true);

    userEvent.click(orderButton);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
    expect(tableRows[1]).toHaveTextContent('Yavin IV');
    expect(tableRows[2]).toHaveTextContent('Tatooine');
    expect(tableRows[3]).toHaveTextContent('Bespin');
    expect(tableRows[4]).toHaveTextContent('Endor');
    expect(tableRows[5]).toHaveTextContent('Kamino');
    expect(tableRows[6]).toHaveTextContent('Alderaan');
    expect(tableRows[7]).toHaveTextContent('Naboo');
    expect(tableRows[8]).toHaveTextContent('Coruscant');
    expect(tableRows[9]).toHaveTextContent('Hoth');
    expect(tableRows[10]).toHaveTextContent('Dagobah');
  });
});
