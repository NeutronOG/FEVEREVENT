import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitorDevices = sqliteTable("visitor_devices", {
  deviceId: text("device_id").primaryKey(),
  firstSeenAt: text("first_seen_at").notNull(),
});
