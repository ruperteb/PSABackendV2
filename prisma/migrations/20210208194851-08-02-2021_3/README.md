# Migration `20210208194851-08-02-2021_3`

This migration has been generated by ruperteb at 2/8/2021, 9:48:51 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Property" DROP CONSTRAINT "Property_propertyListPropertyListId_fkey"

ALTER TABLE "Property" DROP COLUMN "propertyListPropertyListId"

CREATE TABLE "_PropertyToPropertyList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "_PropertyToPropertyList_AB_unique" ON "_PropertyToPropertyList"("A", "B")

CREATE INDEX "_PropertyToPropertyList_B_index" ON "_PropertyToPropertyList"("B")

ALTER TABLE "_PropertyToPropertyList" ADD FOREIGN KEY("A")REFERENCES "Property"("propertyId") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_PropertyToPropertyList" ADD FOREIGN KEY("B")REFERENCES "PropertyList"("propertyListId") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210208174743-08-02-2021_2..20210208194851-08-02-2021_3
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
@@ -39,9 +39,13 @@
   contact LandlordContact? @relation(fields: [contactId], references: [contactId])
   contactId Int?
+  propertyLists PropertyList[]
+  
+
+
 }
 model Premises {
   premisesId Int @id @default(autoincrement())
```

