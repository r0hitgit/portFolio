import AdminResourceCRUD from '../../components/admin/AdminResourceCRUD';
import { adminApi } from '../../api/client';

const FIELDS = [
  { key: 'title', label: 'title', type: 'text' },
  { key: 'slug', label: 'slug (url-friendly, unique)', type: 'text' },
  { key: 'excerpt', label: 'excerpt', type: 'text' },
  { key: 'content', label: 'content (markdown supported)', type: 'textarea' },
  { key: 'tags', label: 'tags (comma-separated)', type: 'text' },
  { key: 'published', label: 'published', type: 'checkbox' },
];

export default function AdminPosts() {
  return (
    <AdminResourceCRUD
      title="Posts"
      path="posts"
      fields={FIELDS}
      columns={['title', 'slug', 'published']}
      fetchList={adminApi.listPosts}
      onCreate={adminApi.createPost}
      onUpdate={adminApi.updatePost}
      onDelete={adminApi.deletePost}
    />
  );
}
