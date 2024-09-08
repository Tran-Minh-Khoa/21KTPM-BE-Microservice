INSERT INTO users (id, name, email, username, password, role, phone, status, created_at, last_update)
VALUES 
('user1', 'John Doe', 'john.doe@example.com', 'johndoe', 'password123', 'admin', '1234567890', 'active', NOW(), NOW()),
('user2', 'Jane Smith', 'jane.smith@example.com', 'janesmith', 'password456', 'user', '0987654321', 'active', NOW(), NOW()),
('user3', 'Bob Johnson', 'bob.johnson@example.com', 'bobjohnson', 'password789', 'user', '1122334455', 'inactive', NOW(), NOW()),
('user4', 'Alice Brown', 'alice.brown@example.com', 'alicebrown', 'password321', 'user', '5566778899', 'active', NOW(), NOW()),
('user5', 'Charlie White', 'charlie.white@example.com', 'charliewhite', 'password654', 'admin', '6677889900', 'inactive', NOW(), NOW());
