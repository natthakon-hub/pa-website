-- schema.sql
DROP TABLE IF EXISTS pages;

CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert home page as default
INSERT INTO pages (id, slug, title, content) VALUES ('1', 'home', 'หน้าแรก', '<h1>ยินดีต้อนรับสู่เว็บ PA</h1><p>ระบบเว็บสามารถแก้ไขเนื้อหาได้ผ่านระบบหลังบ้าน</p>');
