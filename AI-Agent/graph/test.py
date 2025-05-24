import psycopg2
import json

class PostgresStore:
    def __init__(self, dsn: str):
        self.dsn = dsn
        self.conn = self._connect()
        self._create_table_if_not_exists()

    def _connect(self):
        try:
            conn = psycopg2.connect(self.dsn)
            print("✅ Connected to PostgreSQL successfully.")
            return conn
        except Exception as e:
            print("❌ Failed to connect to PostgreSQL:", e)
            raise

    def _create_table_if_not_exists(self):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS memories (
                        namespace TEXT,
                        key TEXT PRIMARY KEY,
                        value JSONB
                    );
                """)
            self.conn.commit()
            print("✅ Table 'memories' ensured (created if not exists).")
        except Exception as e:
            print("❌ Failed to create table:", e)
            raise

    def put(self, namespace, key, value):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO memories (namespace, key, value)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
                """, (str(namespace), key, json.dumps(value)))
            self.conn.commit()
            print("✅ Inserted or updated memory successfully.")
        except Exception as e:
            print("❌ Failed to insert/update memory:", e)

if __name__ == "__main__":
    # ⚠️ Đảm bảo DB 'monkey' đã tồn tại trước
    DSN = "postgresql://postgres:31072004@localhost:5432/monkey"

    store = PostgresStore(DSN)

    # 👇 Test insert dữ liệu
    test_namespace = "memories:demo"
    test_key = "user:123"
    test_value = {"content": "Người dùng thích món bún chả."}
    store.put(test_namespace, test_key, test_value)
