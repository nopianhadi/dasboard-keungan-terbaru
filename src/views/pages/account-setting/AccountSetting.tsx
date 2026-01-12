// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from '../../../components/pages/account-setting/AccountTab';
import BusinessTab from '../../../components/pages/account-setting/BusinessTab';
import { IconArticle, IconBell, IconLock, IconUserCircle, IconBuilding } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';
import NotificationTab from '../../../components/pages/account-setting/NotificationTab';
import BillsTab from '../../../components/pages/account-setting/BillsTab';
import SecurityTab from '../../../components/pages/account-setting/SecurityTab';

const BCrumb = [
  {
    to: '/',
    title: 'Beranda',
  },
  {
    title: 'Pengaturan Akun',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountSetting = () => {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Pengaturan Akun" description="Halaman pengaturan akun pengguna">
      {/* breadcrumb */}
      <Breadcrumb title="Pengaturan Akun" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid size={12}>
          <BlankCard>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="basic tabs example"
              >
                <Tab
                  iconPosition="start"
                  icon={<IconUserCircle size="22" />}
                  label="Akun"
                  {...a11yProps(0)}
                />

                <Tab
                  iconPosition="start"
                  icon={<IconBuilding size="22" />}
                  label="Bisnis"
                  {...a11yProps(1)}
                />

                <Tab
                  iconPosition="start"
                  icon={<IconBell size="22" />}
                  label="Notifikasi"
                  {...a11yProps(2)}
                />
                <Tab
                  iconPosition="start"
                  icon={<IconArticle size="22" />}
                  label="Tagihan"
                  {...a11yProps(3)}
                />
                <Tab
                  iconPosition="start"
                  icon={<IconLock size="22" />}
                  label="Keamanan"
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              <TabPanel value={value} index={0}>
                <AccountTab />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <BusinessTab />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <NotificationTab />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <BillsTab />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <SecurityTab />
              </TabPanel>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;
