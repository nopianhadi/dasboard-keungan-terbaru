-- ============================================
-- PACKAGES & ADD-ONS TABLES
-- ============================================

-- Packages Table
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    duration_options JSONB DEFAULT '[]'::jsonb,
    physical_items JSONB DEFAULT '[]'::jsonb,
    digital_items JSONB DEFAULT '[]'::jsonb,
    processing_time VARCHAR(100),
    photographers VARCHAR(100),
    videographers VARCHAR(100),
    default_printing_cost DECIMAL(15,2) DEFAULT 0,
    default_transport_cost DECIMAL(15,2) DEFAULT 0,
    cover_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_packages_category ON packages(category);
CREATE INDEX idx_packages_is_active ON packages(is_active);

CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add-ons Table
CREATE TABLE IF NOT EXISTS add_ons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    region VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addons_is_active ON add_ons(is_active);

CREATE TRIGGER update_addons_updated_at
    BEFORE UPDATE ON add_ons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Sample Packages
INSERT INTO packages (name, category, region, price, duration_options, physical_items, digital_items, processing_time, photographers, videographers, default_printing_cost, default_transport_cost, cover_image) VALUES
('Wedding Premium', 'Photo + Video', 'Jakarta', 15000000, 
 '["8 Jam", "10 Jam", "12 Jam"]'::jsonb,
 '["Album 30x30 cm (50 halaman)", "USB Flashdisk Custom", "Frame 20x30 cm (2 pcs)", "Cetak 4R (100 lembar)"]'::jsonb,
 '["Foto High Resolution (300+ foto)", "Video Highlight (3-5 menit)", "Raw Photos", "Online Gallery"]'::jsonb,
 '14 hari kerja', '2 Fotografer', '1 Videografer', 2500000, 500000, '/images/wedding-premium.jpg'),

('Wedding Basic', 'Photo', 'Jakarta', 8500000,
 '["6 Jam", "8 Jam"]'::jsonb,
 '["Album 20x30 cm (30 halaman)", "USB Flashdisk", "Cetak 4R (50 lembar)"]'::jsonb,
 '["Foto High Resolution (200+ foto)", "Online Gallery"]'::jsonb,
 '10 hari kerja', '1 Fotografer', '0', 1500000, 300000, '/images/wedding-basic.jpg'),

('Prewedding Package', 'Photo + Video', 'Bali', 12000000,
 '["4 Jam", "6 Jam"]'::jsonb,
 '["Album 30x30 cm (40 halaman)", "USB Flashdisk Custom", "Frame 30x40 cm (1 pcs)"]'::jsonb,
 '["Foto High Resolution (150+ foto)", "Video Cinematic (2-3 menit)", "Online Gallery"]'::jsonb,
 '7 hari kerja', '1 Fotografer', '1 Videografer', 2000000, 1000000, '/images/prewedding.jpg'),

('Corporate Event', 'Photo + Video', 'Jakarta', 6000000,
 '["4 Jam", "6 Jam", "8 Jam"]'::jsonb,
 '["USB Flashdisk", "Cetak 4R (30 lembar)"]'::jsonb,
 '["Foto High Resolution (100+ foto)", "Video Documentation (5-10 menit)", "Online Gallery"]'::jsonb,
 '5 hari kerja', '1 Fotografer', '1 Videografer', 500000, 200000, '/images/corporate.jpg'),

('Product Photography', 'Photo', 'Jakarta', 3500000,
 '["2 Jam", "4 Jam"]'::jsonb,
 '["USB Flashdisk"]'::jsonb,
 '["Foto High Resolution (50+ foto)", "Edited Photos", "Online Gallery"]'::jsonb,
 '3 hari kerja', '1 Fotografer', '0', 0, 100000, '/images/product.jpg')

ON CONFLICT DO NOTHING;

-- Sample Add-ons
INSERT INTO add_ons (name, price, region, description) VALUES
('Tambahan Fotografer', 1500000, 'Jakarta', 'Menambah 1 fotografer untuk coverage yang lebih luas'),
('Tambahan Videografer', 2000000, 'Jakarta', 'Menambah 1 videografer untuk angle video yang beragam'),
('Drone Photography', 1000000, 'Jakarta', 'Foto dan video aerial menggunakan drone'),
('Same Day Edit', 3000000, 'Jakarta', 'Video highlight siap di hari yang sama'),
('Extra Album', 1200000, 'Jakarta', 'Album tambahan 20x30 cm (30 halaman)'),
('Live Streaming', 2500000, 'Jakarta', 'Live streaming acara ke platform media sosial'),
('Photo Booth', 1800000, 'Jakarta', 'Photo booth dengan props dan backdrop custom'),
('Makeup Artist', 2200000, 'Jakarta', 'Makeup artist profesional untuk bride/talent')

ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'PACKAGES & ADD-ONS TABLES CREATED!';
    RAISE NOTICE '✅ packages table with sample data';
    RAISE NOTICE '✅ add_ons table with sample data';
    RAISE NOTICE '============================================';
END $;