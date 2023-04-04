import { render, screen, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

function TestComponent() {
  const [value, setValue] = useLocalStorage('testKey', 'initialValue')

  return (
    <>
      <p data-testid="display-value">{value}</p>
      <button onClick={() => setValue('updatedValue')}>Update Value</button>
    </>
  )
}

describe('useLocalStorage', () => {
  // Clear the local storage before each test
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return the initial value when no value is stored in local storage', () => {
    render(<TestComponent />)
    const displayValue = screen.getByTestId('display-value')
    expect(displayValue.textContent).toBe('initialValue')
  })

  it('should get the value from local storage if it exists', () => {
    localStorage.setItem('testKey', JSON.stringify('testValue'))
    render(<TestComponent />)
    const displayValue = screen.getByTestId('display-value')
    expect(displayValue.textContent).toBe('testValue')
  })

  it('should update the value in both state and local storage when the setter function is called', () => {
    render(<TestComponent />)
    const updateButton = screen.getByText('Update Value')

    act(() => {
      updateButton.click()
    })

    // Check if the state value has been updated
    const displayValue = screen.getByTestId('display-value')
    expect(displayValue.textContent).toBe('updatedValue')

    // Check if the value has been updated in local storage
    const storedValue = localStorage.getItem('testKey')
    expect(JSON.parse(storedValue!)).toBe('updatedValue')
  })
})
