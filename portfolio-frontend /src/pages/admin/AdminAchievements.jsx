import AdminResourceCRUD from '../../components/admin/AdminResourceCRUD';
import { getAchievements, adminApi } from '../../api/client';

const FIELDS = [
  { key: 'title', label: 'title', type: 'text' },
  { key: 'organization', label: 'organization', type: 'text' },
  { key: 'description', label: 'description', type: 'textarea' },
  { key: 'dateLabel', label: 'date label (e.g. Sep 2024)', type: 'text' },
  { key: 'link', label: 'link (optional)', type: 'text' },
  { key: 'icon', label: 'icon (emoji)', type: 'text' },
  { key: 'displayOrder', label: 'display order', type: 'number' },
];

export default function AdminAchievements() {
  return (
    <AdminResourceCRUD
      title="Achievements"
      path="achievements"
      fields={FIELDS}
      columns={['title', 'organization', 'dateLabel']}
      fetchList={() => getAchievements([])}
      onCreate={adminApi.createAchievement}
      onUpdate={adminApi.updateAchievement}
      onDelete={adminApi.deleteAchievement}
    />
  );
}
