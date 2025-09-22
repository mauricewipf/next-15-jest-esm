import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home page', () => {
    it('renders the Next.js logo', () => {
        render(<Home />)

        const logo = screen.getByAltText('Next.js logo')
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute('src', '/next.svg')
        expect(logo).toHaveAttribute('width', '180')
        expect(logo).toHaveAttribute('height', '38')
    })

    it('renders the main content', () => {
        render(<Home />)

        // Check for the main instructional text
        expect(screen.getByText(/Get started by editing/)).toBeInTheDocument()
        expect(screen.getByText('src/app/page.tsx')).toBeInTheDocument()
        expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument()
    })

    it('renders the call-to-action links', () => {
        render(<Home />)

        // Check for the "Deploy now" link
        const deployLink = screen.getByRole('link', { name: /Deploy now/ })
        expect(deployLink).toBeInTheDocument()
        expect(deployLink).toHaveAttribute('href', expect.stringContaining('vercel.com'))
        expect(deployLink).toHaveAttribute('target', '_blank')

        // Check for the "Read our docs" link
        const docsLink = screen.getByRole('link', { name: /Read our docs/ })
        expect(docsLink).toBeInTheDocument()
        expect(docsLink).toHaveAttribute('href', expect.stringContaining('nextjs.org/docs'))
        expect(docsLink).toHaveAttribute('target', '_blank')
    })

    it('renders the footer links', () => {
        render(<Home />)

        // Check for footer links
        expect(screen.getByRole('link', { name: /Learn/ })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Examples/ })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Go to nextjs.org/ })).toBeInTheDocument()
    })

    it('renders images with correct alt text', () => {
        render(<Home />)

        // Check all images have proper alt text
        expect(screen.getByAltText('Next.js logo')).toBeInTheDocument()
        expect(screen.getByAltText('Vercel logomark')).toBeInTheDocument()
        expect(screen.getByAltText('File icon')).toBeInTheDocument()
        expect(screen.getByAltText('Window icon')).toBeInTheDocument()
        expect(screen.getByAltText('Globe icon')).toBeInTheDocument()
    })
})
