
describe('Layout Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const initialState = fromReducer.intialState;
      console.log('banana');
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.reducer(initialState, action);

      expet(tate).toBe(initialState);
    });
  });

  // describe('retrievedBookList action', () => {
  //   it('should retrieve all books and update the state in an immutable way', () => {
  //     const { initialState } = fromReducer;
  //     const newState: Array<Book> = [
  //       {
  //         id: 'firstId',
  //         volumeInfo: {
  //           title: 'First Title',
  //           authors: ['First Author'],
  //         },
  //       },
  //     ];
  //     const action = retrievedBookList({ Book: newState });
  //     const state = fromReducer.booksReducer(initialState, action);

  //     expect(state).toEqual(newState);
  //     expect(state).not.toBe(newState);
  //   });
  // });
});
