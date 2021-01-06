# Migration `20201231134247-31-12-2020`

This migration has been generated by ruperteb at 12/31/2020, 3:42:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Property" ADD COLUMN     "images" TEXT[]
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201221082335-initial2..20201231134247-31-12-2020
--- datamodel.dml
+++ datamodel.dml
@@ -1,14 +1,14 @@
 // 1
 // datasource db {
 //  provider = "sqlite"
-//  url = "***"
+//  url = "***"
 //}
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 // 2
 generator client {
@@ -34,9 +34,11 @@
   notes              String?
   premisesList Premises[]
+  images String[]
+
 }
 model Premises {
   premisesId Int @id @default(autoincrement())
```

