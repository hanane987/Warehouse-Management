import { renderHook, act } from '@testing-library/react-hooks';
import useCreate from '../hooks/useCreate'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 


jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useCreate Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCreate({ codeScanned: '' }));
    
   
    expect(result.current.name).toBe('');
    expect(result.current.type).toBe('');
    expect(result.current.barcode).toBe('');
    expect(result.current.price).toBe('');
    expect(result.current.solde).toBe('');
    expect(result.current.supplier).toBe('');
    expect(result.current.image).toBe('');
    expect(result.current.stockName).toBe('');
    expect(result.current.quantity).toBe('');
    expect(result.current.city).toBe('');
  });

  it('sets name correctly', () => {
    const { result } = renderHook(() => useCreate({ codeScanned: '' }));
    
 
    act(() => {
      result.current.setName('Product A');
    });


    expect(result.current.name).toBe('Product A');
  });
});