import AdminResourceCRUD from '../../components/admin/AdminResourceCRUD';
import { getSkills, adminApi } from '../../api/client';

const FIELDS = [
  { key: 'group', label: 'group key (e.g. languages, frameworks, databases, tools, cloud)', type: 'text' },
  { key: 'label', label: 'display label (e.g. languages, frameworks_libraries, developer_tools)', type: 'text' },
  { key: 'items', label: 'items (comma-separated, e.g. Java, Python, React, PostgreSQL)', type: 'list' },
  { key: 'displayOrder', label: 'display order', type: 'number' },
];

export default function AdminSkills() {
  return (
    <AdminResourceCRUD
      title="Skills (What I work with)"
      path="skills"
      fields={FIELDS}
      columns={['group', 'label', 'displayOrder']}
      fetchList={() => getSkills([])}
      onCreate={adminApi.createSkill}
      onUpdate={adminApi.updateSkill}
      onDelete={adminApi.deleteSkill}
    />
  );
}

