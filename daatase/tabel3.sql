-- ============================================
-- CREATE MISSING TABLES
-- Tables that are referenced in the application but missing from database
-- ============================================

-- ============================================
-- PROJECT ADD-ONS JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS project_add_ons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    add_on_id UUID NOT NULL REFERENCES add_ons(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(project_id, add_on_id)
);

CREATE INDEX idx_project_add_ons_project ON project_add_ons(project_id);
CREATE INDEX idx_project_add_ons_add_on ON project_add_ons(add_on_id);

CREATE TRIGGER update_project_add_ons_updated_at
    BEFORE UPDATE ON project_add_ons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATE EXISTING ADD-ONS FROM JSONB TO JUNCTION TABLE
-- ============================================
DO $$
DECLARE
    project_record RECORD;
    addon_item JSONB;
    addon_id UUID;
BEGIN
    -- Loop through all projects that have add_ons data
    FOR project_record IN 
        SELECT id, add_ons 
        FROM projects 
        WHERE add_ons IS NOT NULL 
        AND jsonb_array_length(add_ons) > 0
    LOOP
        -- Loop through each add-on in the JSONB array
        FOR addon_item IN 
            SELECT * FROM jsonb_array_elements(project_record.add_ons)
        LOOP
            -- Try to find the add-on by name
            SELECT id INTO addon_id 
            FROM add_ons 
            WHERE name = (addon_item->>'name')
            LIMIT 1;
            
            -- If found, insert into junction table
            IF addon_id IS NOT NULL THEN
                INSERT INTO project_add_ons (project_id, add_on_id)
                VALUES (project_record.id, addon_id)
                ON CONFLICT (project_id, add_on_id) DO NOTHING;
            END IF;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Migrated add-ons from JSONB to junction table';
END $$;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'MISSING TABLES CREATED SUCCESSFULLY!';
    RAISE NOTICE '============================================';
    RAISE NOTICE '✅ project_add_ons junction table';
    RAISE NOTICE '✅ Migrated existing add-ons data';
    RAISE NOTICE '============================================';
END $$;