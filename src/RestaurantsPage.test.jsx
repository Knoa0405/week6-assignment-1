import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import RestaurantsPage from './RestaurantsPage';

describe('RestaurantsPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      regions: [{ id: 1, name: '서울' }],
      categories: [{ id: 1, name: '한식' }],
      restaurants: [{ id: 1, name: '마법사주방' }],
    }));
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  it('dispatch가 호출된다.', () => {
    render(<RestaurantsPage />, { wrapper: MemoryRouter });
    expect(dispatch).toBeCalled();
  });

  it('지역과 카테고리 버튼이 있다.', () => {
    const { queryByText } = render(<RestaurantsPage />, { wrapper: MemoryRouter });

    expect(queryByText('서울')).not.toBeNull();
    expect(queryByText('한식')).not.toBeNull();
  });
});