DO $$
BEGIN
    FOR i IN 1..50 LOOP
        INSERT INTO event (
            poster, 
            brand_id,
            name, 
            description, 
            start_time, 
            end_time, 
            created_at, 
            updated_at
        ) VALUES (
            CONCAT('https://picsum.photos/seed/picsum', i, '/500/300'),  -- Sample poster filename
            1,
            CONCAT('Event ', i),  -- Event name
            CONCAT('Lorem ipsum odor amet, consectetuer adipiscing elit. Penatibus tellus velit rutrum vehicula parturient nibh fames platea viverra. Auctor pretium tellus ad nam cras tempor libero semper. Luctus auctor nullam ullamcorper faucibus vehicula sollicitudin fermentum_', i),  -- Event description
            NOW() - INTERVAL '1 day',  -- Start time: yesterday
            NOW() - INTERVAL '1 day' + INTERVAL '7 days',  -- End time: 7 days after start time
            NOW(),  -- Created at: current timestamp
            NOW()  -- Updated at: current timestamp
        );
    END LOOP;
END $$;