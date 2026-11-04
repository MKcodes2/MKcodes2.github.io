import { Link } from 'react-router-dom'
import Page from '../components/Page'

export default function NotFound() {
  return (
    <Page>
      <h1 className="pt-24 text-3xl font-bold">Page not found</h1>
      <Link to="/" className="mt-4 inline-block mb-24 gradient-text">Back to home →</Link>
    </Page>
  )
}
