import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconPoint,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconCurrencyDollar,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartDonut3,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconHelp,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
  IconAddressBook,
  IconBox,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Beranda',
  },

  {
    id: uniqueId(),
    title: 'Modern',
    icon: IconAperture,
    href: '/dashboards/modern',
    chip: 'Baru',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'eCommerce',
    icon: IconShoppingCart,
    href: '/dashboards/ecommerce',
  },
  {
    id: uniqueId(),
    title: 'Halaman Frontend',
    icon: IconAppWindow,
    href: '/frontend-pages/',
    children: [
      {
        id: uniqueId(),
        title: 'Beranda',
        icon: IconPoint,
        href: '/frontend-pages/homepage',
      },
      {
        id: uniqueId(),
        title: 'Tentang Kami',
        icon: IconPoint,
        href: '/frontend-pages/about',
      },
      {
        id: uniqueId(),
        title: 'Blog',
        icon: IconPoint,
        href: '/frontend-pages/blog',
      },
      {
        id: uniqueId(),
        title: 'Detail Blog',
        icon: IconPoint,
        href: '/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
      },
      {
        id: uniqueId(),
        title: 'Kontak',
        icon: IconPoint,
        href: '/frontend-pages/contact',
      },
      {
        id: uniqueId(),
        title: 'Portofolio',
        icon: IconPoint,
        href: '/frontend-pages/portfolio',
      },
      {
        id: uniqueId(),
        title: 'Harga',
        icon: IconPoint,
        href: '/frontend-pages/pricing',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'Aplikasi',
  },
  {
    id: uniqueId(),
    title: 'Proyek',
    icon: IconNotebook,
    href: '/apps/projects',
    chip: '24',
    chipColor: 'primary',
  },
  {
    id: uniqueId(),
    title: 'Klien',
    icon: IconUserCircle,
    href: '/apps/clients',
    chip: '156',
    chipColor: 'success',
  },
  {
    id: uniqueId(),
    title: 'Keuangan',
    icon: IconCurrencyDollar,
    href: '/apps/finance',
  },
  {
    id: uniqueId(),
    title: 'Tim & Freelancer',
    icon: IconUserCircle,
    href: '/apps/team',
    chip: '48',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Paket & Add-ons',
    icon: IconBox,
    href: '/apps/packages',
    chip: '12',
    chipColor: 'warning',
  },
  {
    id: uniqueId(),
    title: 'Kontak',
    icon: IconAddressBook,
    chip: '2',
    chipColor: 'secondary',
    href: '/apps/contacts',
  },

  {
    id: uniqueId(),
    title: 'Blog',
    icon: IconChartDonut3,
    href: '/frontend-pages/blog/',
    children: [
      {
        id: uniqueId(),
        title: 'Postingan',
        icon: IconPoint,
        href: '/frontend-pages/blog/',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Ecommerce',
    icon: IconBasket,
    href: '/apps/ecommerce/',
    children: [
      {
        id: uniqueId(),
        title: 'Toko',
        icon: IconPoint,
        href: '/apps/ecommerce/shop',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/apps/ecommerce/detail/1',
      },
      {
        id: uniqueId(),
        title: 'Daftar',
        icon: IconPoint,
        href: '/apps/ecommerce/eco-product-list',
      },
      {
        id: uniqueId(),
        title: 'Checkout',
        icon: IconPoint,
        href: '/apps/ecommerce/eco-checkout',
      },
      {
        id: uniqueId(),
        title: 'Tambah Produk',
        icon: IconPoint,
        href: '/apps/ecommerce/add-product',
      },
      {
        id: uniqueId(),
        title: 'Edit Produk',
        icon: IconPoint,
        href: '/apps/ecommerce/edit-product',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Obrolan',
    icon: IconMessage2,
    href: '/apps/chats',
  },
  {
    id: uniqueId(),
    title: 'Pengguna',
    icon: IconUserCircle,
    href: '/user-profile',
    children: [
      {
        id: uniqueId(),
        title: 'Profil',
        icon: IconPoint,
        href: '/user-profile',
      },
      {
        id: uniqueId(),
        title: 'Pengikut',
        icon: IconPoint,
        href: '/apps/followers',
      },
      {
        id: uniqueId(),
        title: 'Teman',
        icon: IconPoint,
        href: '/apps/friends',
      },
      {
        id: uniqueId(),
        title: 'Galeri',
        icon: IconPoint,
        href: '/apps/gallery',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Catatan',
    icon: IconNotes,
    href: '/apps/notes',
  },
  {
    id: uniqueId(),
    title: 'Kalender',
    icon: IconCalendar,
    href: '/apps/calendar',
  },
  {
    id: uniqueId(),
    title: 'Email',
    icon: IconMail,
    href: '/apps/email',
  },
  {
    id: uniqueId(),
    title: 'Tiket',
    icon: IconTicket,
    href: '/apps/tickets',
  },
  {
    id: uniqueId(),
    title: 'Kanban',
    icon: IconNotebook,
    href: '/apps/kanban',
  },

  {
    id: uniqueId(),
    title: 'Faktur',
    icon: IconFileCheck,
    href: '/apps/invoice/list',
    children: [
      {
        id: uniqueId(),
        title: 'Daftar',
        icon: IconPoint,
        href: '/apps/invoice/list',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/apps/invoice/detail/PineappleInc',
      },
      {
        id: uniqueId(),
        title: 'Buat',
        icon: IconPoint,
        href: '/apps/invoice/create',
      },
      {
        id: uniqueId(),
        title: 'Edit',
        icon: IconPoint,
        href: '/apps/invoice/edit/PineappleInc',
      },
    ],
  },

  {
    navlabel: true,
    subheader: 'Halaman',
  },
  {
    id: uniqueId(),
    title: 'Harga',
    icon: IconCurrencyDollar,
    href: '/pages/pricing',
  },
  {
    id: uniqueId(),
    title: 'Pengaturan Akun',
    icon: IconUserCircle,
    href: '/pages/account-settings',
  },
  {
    id: uniqueId(),
    title: 'FAQ',
    icon: IconHelp,
    href: '/pages/faq',
  },
  {
    id: uniqueId(),
    title: 'Halaman Landing',
    icon: IconAppWindow,
    href: '/landingpage',
  },
  {
    id: uniqueId(),
    title: 'Widget',
    icon: IconLayout,
    href: '/widgets/cards',
    children: [
      {
        id: uniqueId(),
        title: 'Kartu',
        icon: IconPoint,
        href: '/widgets/cards',
      },
      {
        id: uniqueId(),
        title: 'Banner',
        icon: IconPoint,
        href: '/widgets/banners',
      },
      {
        id: uniqueId(),
        title: 'Grafik',
        icon: IconPoint,
        href: '/widgets/charts',
      },
    ],
  },

];

export default Menuitems;
