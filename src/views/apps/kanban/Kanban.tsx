import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import TaskManager from 'src/components/apps/kanban/TaskManager';
import { KanbanDataContextProvider } from 'src/context/kanbancontext/index';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent, Box, Button } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Kanban',
  },
];

const Kanban = () => {
  const navigate = useNavigate();
  
  return (
    <KanbanDataContextProvider>
      <PageContainer title="Kanban App" description="this is Kanban App">
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Breadcrumb title="Improving Work Processes" items={BCrumb} />
          <Button
            variant="outlined"
            startIcon={<IconArrowLeft size={18} />}
            onClick={() => navigate('/apps/projects')}
          >
            Kembali ke Projects
          </Button>
        </Box>
        <BlankCard>
          <CardContent>
            <TaskManager />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </KanbanDataContextProvider>
  );
};

export default Kanban;
