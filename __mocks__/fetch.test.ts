const fetchMock = jest.fn();

global.fetch = fetchMock;

export default fetchMock;
