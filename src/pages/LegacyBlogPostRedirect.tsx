import { Navigate, useParams } from 'react-router-dom';

const WRITING_PATH = '/writing';

export default function LegacyBlogPostRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `${WRITING_PATH}/${slug}` : WRITING_PATH} replace />;
}
