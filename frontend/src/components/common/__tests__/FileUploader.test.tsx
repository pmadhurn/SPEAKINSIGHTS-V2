import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FileUploader from '../../common/FileUploader'

beforeAll(() => {
	// Stub fetch for upload
	global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ meeting_id: 1 }) }) as any
})

test('shows success after drop', async () => {
	render(<FileUploader />)
	const dropzone = screen.getByText(/Drag and drop a file here/i)
	const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
	fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })
	expect(await screen.findByText(/Meeting ID: 1/)).toBeInTheDocument()
})


