import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Settings from '../../pages/Settings'

test('saves to localStorage', async () => {
	const user = userEvent.setup()
	render(<Settings />)
	const apiInput = screen.getByPlaceholderText('http://localhost:8000')
	await user.clear(apiInput)
	await user.type(apiInput as HTMLInputElement, 'http://example.com:9000')
	await user.click(screen.getByText('Save'))
	expect(window.localStorage.getItem('API_BASE_URL')).toBe('http://example.com:9000')
})


