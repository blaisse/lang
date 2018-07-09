import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock;

//   { classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() } }

  const classList = {
    contains: jest.fn(), remove: jest.fn(), add: jest.fn()
  };

  global.classList = classList;