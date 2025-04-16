global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});