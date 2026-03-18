import type { generatedData } from '@/lib/mock/generated-data';

export type GeneratedData = typeof generatedData;
export type RequirementRecord = GeneratedData['requirements'][number];
export type PurchaseOrderRecord = GeneratedData['purchaseOrders'][number];
export type InventoryRecord = GeneratedData['inventoryItems'][number];
export type AlertRecord = GeneratedData['alerts'][number];
export type AIRecommendationRecord = GeneratedData['aiRecommendations'][number];
