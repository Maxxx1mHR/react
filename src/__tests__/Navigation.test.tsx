import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Navigation from '../components/Navigation/Navigation';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

describe('Tests for the Pagination component:', () => {
  it('The component updates URL query parameter when page changes. Click next page', async () => {
    render(<Navigation limit={4} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const NextPageButton = await screen.findByTestId('next-page');
    fireEvent.click(NextPageButton);
    expect(mockRouter.asPath).to.equal('/?page=2&limit=4');
  });

  it('The component updates URL query parameter when page changes. Click first page', async () => {
    render(<Navigation limit={12} currentPage={10} />, {
      wrapper: MemoryRouterProvider,
    });
    const firstPageButton = await screen.findByTestId('first-page');
    fireEvent.click(firstPageButton);
    expect(mockRouter.asPath).to.equal('/?page=1&limit=12');
  });

  it('The component updates URL query parameter when page changes. Click prev page', async () => {
    render(<Navigation limit={32} currentPage={18} />, {
      wrapper: MemoryRouterProvider,
    });
    const PrevPageButton = await screen.findByTestId('prev-page');
    fireEvent.click(PrevPageButton);
    expect(mockRouter.asPath).to.equal('/?page=17&limit=32');
  });

  it('The component updates URL query parameter when page changes. Click last page', async () => {
    render(<Navigation limit={104} currentPage={4} />, {
      wrapper: MemoryRouterProvider,
    });
    const LastPageButton = await screen.findByTestId('last-page');
    fireEvent.click(LastPageButton);
    expect(mockRouter.asPath).to.equal('/?page=7&limit=104');
  });

  it('Test functions to switch pages', async () => {
    render(<Navigation limit={104} currentPage={7} />, {
      wrapper: MemoryRouterProvider,
    });
    const NextPageButton = await screen.findByTestId('next-page');
    fireEvent.click(NextPageButton);
    expect(mockRouter.asPath).to.equal('/?page=7&limit=104');

    cleanup();

    render(<Navigation limit={104} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const PrevPageButton = await screen.findByTestId('prev-page');
    mockRouter.push('/?page=1&limit=104');
    fireEvent.click(PrevPageButton);
    expect(mockRouter.asPath).to.equal('/?page=1&limit=104');

    cleanup();

    render(<Navigation limit={104} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const firstPageButton = await screen.findByTestId('first-page');
    mockRouter.push('/?page=1&limit=104');
    fireEvent.click(firstPageButton);
    expect(mockRouter.asPath).to.equal('/?page=1&limit=104');

    cleanup();

    render(<Navigation limit={104} currentPage={7} />, {
      wrapper: MemoryRouterProvider,
    });
    const LastPageButton = await screen.findByTestId('last-page');
    mockRouter.push('/?page=7&limit=104');
    fireEvent.click(LastPageButton);
    expect(mockRouter.asPath).to.equal('/?page=7&limit=104');
  });
});
