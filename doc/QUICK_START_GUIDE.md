# Quick Start Guide - Vena Pictures CRM

## 🚀 Getting Started

### Development Server
Your application is currently running at:
```
http://localhost:5174/
```

### Available Routes

#### Main Features
1. **Leads Management** - `/apps/leads`
   - Chat-style interface
   - Lead tracking and conversion
   - Chat templates for quick communication

2. **Projects** - `/apps/projects`
   - 3 view modes: Grid, Table, Kanban
   - Project tracking and management
   - Status updates and progress monitoring

3. **Clients** - `/apps/clients`
   - Client management
   - 2 view modes: Grid, Table
   - Status tracking (Aktif, Prospek, Tidak Aktif)
   - Client type (Langsung, Vendor)
   - Expandable table with full details

4. **Team** - `/apps/team`
   - Freelancer management
   - Payment tracking
   - Performance monitoring

5. **Finance** - `/apps/finance`
   - Cards & Bank accounts
   - Budget pockets
   - Transaction tracking

6. **Kanban Board** - `/apps/kanban`
   - "Improving Work Processes" view
   - Visual project workflow

---

## 📋 Feature Overview

### 1. Leads Management (`/apps/leads`)

**What it does:**
- Manage prospective clients
- Track lead sources (WhatsApp, Instagram, Website, etc.)
- Monitor lead status (Diskusi, Tindak Lanjut, Dikonversi, Ditolak)
- Quick communication with chat templates

**Key Features:**
- ✅ Search and filter leads
- ✅ Priority indicators (Tinggi, Sedang, Rendah)
- ✅ Mini dashboard with stats
- ✅ Chat templates with variable replacement
- ✅ Quick contact via WhatsApp/Email
- ✅ Lead conversion tracking

**How to use:**
1. Click on a lead in the sidebar to view details
2. Use the search bar to find specific leads
3. Filter by status using the tabs
4. Click "Chat Templates" to send quick messages
5. Use quick action buttons to contact leads

---

### 2. Projects (`/apps/projects`)

**What it does:**
- Manage all photography/videography projects
- Track project progress and payments
- Monitor team assignments

**Key Features:**
- ✅ 3 View Modes:
  - **Grid View**: Card-based layout
  - **Table View**: Expandable rows with details
  - **Kanban View**: Visual workflow board
- ✅ Status tracking (Diskusi → Persiapan → Pemotretan → Editing → Revisi → Selesai)
- ✅ Progress bars and payment status
- ✅ Search and filter functionality
- ✅ Export to CSV

**How to use:**
1. Toggle between Grid/Table/Kanban views using the buttons
2. Filter projects by status using tabs
3. Search by project name, client, or type
4. Click on a project to view/edit details
5. Use the menu (⋮) for more actions

**Table View Features:**
- Click the expand button (▼) to see full project details
- View team members, costs, dates, and location
- Color-coded progress bars

---

### 3. Chat Templates (in Leads)

**What it does:**
- Pre-written message templates for quick communication
- Automatic variable replacement with lead data

**Available Templates:**
1. **Greeting Awal** - Initial contact
2. **Follow Up** - Follow-up messages
3. **Proposal Penawaran** - Proposal offers
4. **Closing Deal** - Deal closing
5. **Konfirmasi Budget** - Budget confirmation

**Variables:**
- `{name}` - Lead's name
- `{projectType}` - Type of project
- `{budget}` - Estimated budget (auto-formatted)
- `{company}` - Company name
- `{email}` - Email address
- `{phone}` - Phone number

**How to use:**
1. Select a lead
2. Scroll to "Chat Templates" section
3. Click on a template
4. Preview and edit the message
5. Send via WhatsApp, Email, or Copy

**Create Custom Template:**
1. Click "Buat" button
2. Enter template name and category
3. Write message with variables (e.g., "Halo {name}")
4. Save template

---

### 4. Kanban Board

**What it does:**
- Visual workflow management
- Drag-and-drop project organization (ready for implementation)

**Columns:**
1. **Diskusi** - Initial discussions
2. **Persiapan** - Preparation phase
3. **Pemotretan** - Shooting phase
4. **Editing** - Editing phase
5. **Revisi** - Revision phase
6. **Selesai** - Completed projects

**How to use:**
1. View projects organized by status
2. Click on a project card for details
3. Use menu (⋮) for actions
4. (Future: Drag cards between columns)

---

## 🎨 UI Components Guide

### Status Colors
- **Blue (Primary)**: Diskusi, Default actions
- **Orange (Warning)**: Persiapan, Tindak Lanjut, DP Terbayar
- **Green (Success)**: Selesai, Dikonversi, Lunas, Aktif
- **Red (Error)**: Ditolak, Tidak Aktif, Belum Bayar
- **Purple (Secondary)**: Editing phase

### Priority Colors (Leads)
- **Red**: Tinggi (High priority)
- **Orange**: Sedang (Medium priority)
- **Blue**: Rendah (Low priority)

### Progress Bar Colors (Projects)
- **Green**: 80%+ progress
- **Blue**: 50-79% progress
- **Orange**: <50% progress

---

## 💡 Tips & Tricks

### Search Tips
- Search works across multiple fields (name, client, type)
- Case-insensitive search
- Real-time filtering

### Filter Tips
- Use status tabs for quick filtering
- Combine search with status filters
- Sort by name, date, or progress

### Template Tips
- Create templates for common scenarios
- Use variables for personalization
- Edit templates before sending
- Save frequently used messages

### View Mode Tips
- **Grid View**: Best for visual overview (Projects & Clients)
- **Table View**: Best for detailed comparison (Projects & Clients)
- **Kanban View**: Best for workflow management (Projects only)

---

## 📊 Dashboard Statistics

### Projects Dashboard
- Total Projects count
- Active Projects count
- Total Revenue (Rupiah)
- Average Progress percentage
- Revenue trends chart
- Project distribution by status

### Leads Dashboard
- Total Leads count
- Follow Up count
- Converted count
- Conversion Rate percentage
- Status distribution
- Leads by source

---

## 🔧 Common Actions

### Add New Lead
1. Go to `/apps/leads`
2. Click "Lead Baru" button
3. Fill in the form
4. Click "Simpan"

### Add New Project
1. Go to `/apps/projects`
2. Click "Proyek Baru" button
3. Fill in project details
4. Click "Buat Proyek"

### Update Project Status
1. Find the project
2. Click menu (⋮)
3. Select "Ubah Status"
4. Choose new status
5. Click "Simpan"

### Send Template Message
1. Select a lead
2. Click on a template
3. Review/edit message
4. Click "WhatsApp" or "Email"

### Export Projects
1. Go to `/apps/projects`
2. Apply desired filters
3. Click "Export" button
4. CSV file will download

---

## 📱 Mobile Usage

### Mobile Features
- Responsive design for all screen sizes
- Touch-friendly buttons
- Collapsible sidebar (toggle with ☰)
- Scrollable tabs
- Optimized forms

### Mobile Tips
- Use the hamburger menu (☰) to toggle sidebar
- Swipe tabs to see more options
- Tap and hold for additional actions
- Use landscape mode for tables

---

## 🐛 Troubleshooting

### Page Not Loading
- Check if dev server is running
- Refresh the page (Ctrl+R or Cmd+R)
- Clear browser cache

### Data Not Showing
- Currently using mock data
- Check browser console for errors
- Verify route is correct

### Template Not Working
- Ensure lead has required data
- Check variable names match
- Preview before sending

---

## 📚 Documentation Files

### Implementation Docs
- `COMPLETE_IMPLEMENTATION_SUMMARY.md` - Full feature overview
- `LEADS_FEATURE_IMPLEMENTATION.md` - Leads details
- `PROJECT_TABLE_VIEW_IMPLEMENTATION.md` - Table view details
- `IMPROVING_WORK_PROCESSES_INTEGRATION.md` - Kanban integration
- `IMPLEMENTATION_SUMMARY.md` - Mock data system

### Data Documentation
- `src/data/README.md` - Mock data structure and usage

---

## 🎯 Next Steps

### For Development
1. Test all features thoroughly
2. Customize templates as needed
3. Add more mock data if required
4. Prepare for backend integration

### For Production
1. Replace mock data with API calls
2. Implement authentication
3. Add real-time updates
4. Set up database
5. Deploy to production server

---

## 📞 Support

### Need Help?
- Check documentation files
- Review code comments
- Test with mock data first
- Verify TypeScript types

### Common Issues
- **Import errors**: Check file paths
- **Type errors**: Verify interface definitions
- **UI issues**: Check MUI version compatibility
- **State issues**: Review Context usage

---

## ✅ Checklist

### Before Using
- [ ] Dev server is running
- [ ] No console errors
- [ ] All routes accessible
- [ ] Mock data loaded

### Testing Features
- [ ] Leads page loads
- [ ] Projects page loads
- [ ] Clients page loads
- [ ] View modes work (Grid/Table/Kanban)
- [ ] Projects table view works
- [ ] Clients table view works
- [ ] Search and filters work
- [ ] Templates work
- [ ] Forms submit correctly
- [ ] Dialogs open/close
- [ ] Mobile responsive

---

**Happy Coding! 🚀**

For detailed technical information, see `COMPLETE_IMPLEMENTATION_SUMMARY.md`
