import AdminResourceCRUD from '../../components/admin/AdminResourceCRUD';
import { getEducation, adminApi } from '../../api/client';

const FIELDS = [
  { key: 'institution', label: 'institution', type: 'text' },
  { key: 'degree', label: 'degree', type: 'text' },
  { key: 'location', label: 'location', type: 'text' },
  { key: 'scoreLabel', label: 'score label (e.g. 7.7 CGPA)', type: 'text' },
  { key: 'startLabel', label: 'start label', type: 'text' },
  { key: 'endLabel', label: 'end label', type: 'text' },
  { key: 'displayOrder', label: 'display order', type: 'number' },
];

export default function AdminEducation() {
  return (
    <AdminResourceCRUD
      title="Education"
      path="education"
      fields={FIELDS}
      columns={['institution', 'degree', 'scoreLabel']}
      fetchList={() => getEducation([])}
      onCreate={adminApi.createEducation}
      onUpdate={adminApi.updateEducation}
      onDelete={adminApi.deleteEducation}
    />
  );
}
