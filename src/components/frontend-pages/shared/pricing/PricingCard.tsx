import { Box, Grid, Typography, Chip, CardContent, Divider, Stack, Button } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';

import IconCheck from 'src/assets/images/frontend-pages/icons/icon-check.svg';
import IconClose from 'src/assets/images/frontend-pages/icons/icon-close.svg';

const Licenses = [
  {
    id: 1,
    type: 'Single Use',
    isPopular: false,
    typeText: 'Use for single end product which end users can’t be charged for.',
    price: '49',
    fullSourceCode: true,
    isDoc: true,
    isSass: false,
    isSingleProject: true,
    isSupport: true,
    isUpdate: true,
  },
  {
    id: 2,
    type: 'Multiple Use',
    isPopular: false,
    typeText: 'Use for unlimited end products end users can’t be charged for.',
    price: '89',
    fullSourceCode: true,
    isDoc: true,
    isSass: false,
    isSingleProject: false,
    isSupport: true,
    isUpdate: true,
  },
  {
    id: 3,
    type: 'Penggunaan Extended',
    isPopular: true,
    typeText: 'Gunakan untuk satu produk akhir yang pengguna akhir dapat dikenakan biaya.',
    price: '299',
    fullSourceCode: true,
    isDoc: true,
    isSass: true,
    isSingleProject: true,
    isSupport: true,
    isUpdate: true,
  },
  {
    id: 4,
    type: 'Penggunaan Tak Terbatas',
    isPopular: false,
    typeText: 'Gunakan dalam produk akhir tak terbatas yang pengguna akhir dapat dikenakan biaya.',
    price: '499',
    fullSourceCode: true,
    isDoc: true,
    isSass: true,
    isSingleProject: false,
    isSupport: true,
    isUpdate: true,
  },
];

const PricingCard = () => {
  return (<>
    <Grid container spacing={3}>
      {Licenses.map((license, i) => (
        <Grid
          key={i}
          size={{
            xs: 12,
            lg: 3,
            sm: 6
          }}>
          <BlankCard>
            <CardContent sx={{ p: '32px' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h4" fontSize="20px" fontWeight={600}>
                  {license.type}
                </Typography>
                {license.isPopular ? (
                  <Chip
                    label="Populer"
                    size="small"
                    sx={{
                      ml: '6px',
                      borderRadius: '8px',
                      color: 'primary.main',
                      backgroundColor: 'rgba(93, 135, 255, 0.15)',
                    }}
                  />
                ) : null}
              </Box>

              <Typography fontSize="13px" mb={4}>
                {license.typeText}
              </Typography>
              <Divider />
              <Stack mt={4} direction="row" gap="8px" alignItems="end">
                <Typography variant="h4" fontSize="40px" fontWeight={700}>
                  ${license.price}
                </Typography>
                <Typography variant="body2" fontSize="14px">
                  / bayar sekali
                </Typography>
              </Stack>
              <Stack my={4} gap="12px">
                <Box display="flex" alignItems="center" gap="8px">
                  {license.fullSourceCode ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconClose} alt="circle" width={20} height={20} />
                  )}
                  <Typography fontSize="14px" fontWeight={500}>
                    Kode sumber lengkap
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  {license.isDoc ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconClose} alt="circle" width={20} height={20} />
                  )}
                  <Typography fontSize="14px" fontWeight={500}>
                    Dokumentasi
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  {license.isSass ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconClose} alt="circle" width={20} height={20} />
                  )}
                  <Typography
                    fontSize="14px"
                    sx={{
                      color: `${license.isSass ? 'text.primary' : '#99AABA'}`,
                      fontWeight: `${license.isSass ? '500' : '400'}`,
                    }}
                  >
                    Gunakan dalam aplikasi SaaS
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  {license.isSingleProject ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  )}
                  <Typography
                    fontSize="14px"
                    whiteSpace="nowrap"
                    gap="2px"
                    fontWeight={500}
                    display="flex"
                  >
                    <Box fontWeight={700} component="span" whiteSpace="nowrap">
                      {' '}
                      {license.isSingleProject ? 'Satu' : 'Tak Terbatas'}{' '}
                    </Box>
                    Proyek
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  {license.isSupport ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconClose} alt="circle" width={20} height={20} />
                  )}
                  <Typography
                    fontSize="14px"
                    whiteSpace="nowrap"
                    gap="2px"
                    fontWeight={500}
                    display="flex"
                  >
                    <Box fontWeight={700} component="span" whiteSpace="nowrap">
                      Satu Tahun
                    </Box>{' '}
                    Dukungan Teknis
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  {license.isUpdate ? (
                    <img src={IconCheck} alt="circle" width={20} height={20} />
                  ) : (
                    <img src={IconClose} alt="circle" width={20} height={20} />
                  )}
                  <Typography
                    fontSize="14px"
                    whiteSpace="nowrap"
                    gap="2px"
                    fontWeight={500}
                    display="flex"
                  >
                    <Box fontWeight={700} component="span" whiteSpace="nowrap">
                      Satu Tahun
                    </Box>{' '}
                    Pembaruan Gratis
                  </Typography>
                </Box>
              </Stack>
              <Button fullWidth variant="contained" size="large">
                Beli Sekarang
              </Button>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  </>);
};

export default PricingCard;
