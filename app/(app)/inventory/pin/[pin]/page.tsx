import { PinJourneyPage } from '@/features/pin-journey/components/pin-journey-page';

export default async function InventoryPinPage({ params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  return <PinJourneyPage pin={decodeURIComponent(pin)} />;
}
