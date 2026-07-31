import AdminResourceCRUD from '../../components/admin/AdminResourceCRUD';
import { getProjects, adminApi } from '../../api/client';

const FIELDS = [
  { key: 'title', label: 'title', type: 'text' },
  { key: 'slug', label: 'slug (url-friendly, unique)', type: 'text' },
  { key: 'description', label: 'short description', type: 'text' },
  { key: 'bullets', label: 'bullets (one per line)', type: 'bullets' },
  { key: 'techStack', label: 'tech stack (comma-separated)', type: 'list' },
  { key: 'repoUrl', label: 'repo URL', type: 'text' },
  { key: 'liveUrl', label: 'live URL', type: 'text' },
  { key: 'imageUrl', label: 'image URL', type: 'text' },
  { key: 'projectDate', label: 'date', type: 'date' },
  { key: 'featured', label: 'featured', type: 'checkbox' },
  { key: 'displayOrder', label: 'display order', type: 'number' },
];

export default function AdminProjects() {
  return (
    <AdminResourceCRUD
      title="Projects"
      path="projects"
      fields={FIELDS}
      columns={['title', 'slug', 'displayOrder']}
      fetchList={() => getProjects([])}
      onCreate={adminApi.createProject}
      onUpdate={adminApi.updateProject}
      onDelete={adminApi.deleteProject}
    />
  );
}
