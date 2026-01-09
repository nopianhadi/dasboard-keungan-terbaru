import { Box, CardContent, Grid, Typography } from '@mui/material';
import { mockClients, mockProjects, mockTeamMembers, mockFinanceCards, formatCurrency } from 'src/data/mockData';

import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

const TopCards = () => {
  // Calculate dynamic values from mock data
  const totalBalance = mockFinanceCards.reduce((sum, card) => sum + card.balance, 0);
  const activeProjects = mockProjects.filter(p => p.status !== 'Selesai').length;
  const activeClients = mockClients.filter(c => c.status === 'Aktif').length;
  const totalFreelancers = mockTeamMembers.filter(t => t.isActive).length;

  const topcards: cardType[] = [
    {
      icon: icon6,
      title: 'Total Saldo',
      digits: formatCurrency(totalBalance),
      bgcolor: 'success',
    },
    {
      icon: icon4,
      title: 'Proyek Aktif',
      digits: activeProjects.toString(),
      bgcolor: 'primary',
    },
    {
      icon: icon3,
      title: 'Klien Aktif',
      digits: activeClients.toString(),
      bgcolor: 'warning',
    },
    {
      icon: icon2,
      title: 'Total Freelancer',
      digits: totalFreelancers.toString(),
      bgcolor: 'secondary',
    },
  ];

  return (
    (<Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid
          key={i}
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>)
  );
};

export default TopCards;
