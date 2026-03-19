import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getPaymentRequests, getPaymentTransactions, getPurchaseOrders } from '@/lib/db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function PaymentsPage() {
  const requests = getPaymentRequests();
  const transactions = getPaymentTransactions();
  const pos = getPurchaseOrders();
  return (
    <div className="space-y-6">
      <PageHeader title="Payment tracker" description="Advance payment lifecycle from request to finance review, payment, vendor confirmation, settlement, or hold." />
      <DataTable
        headers={['PO', 'Requested', 'Payment request', 'Transaction', 'Reference']}
        rows={requests.map((request) => {
          const po = pos.find((entry) => entry.id === request.purchase_order_id);
          const transaction = transactions.find((entry) => entry.purchase_order_id === request.purchase_order_id);
          return [
            po?.po_number ?? request.purchase_order_id,
            `${formatCurrency(request.amount)} · ${formatDate(request.requested_on)}`,
            <StatusBadge key={request.id} value={request.status} />,
            transaction ? <StatusBadge key={transaction.id} value={transaction.status} /> : '—',
            transaction?.reference_number ?? 'Pending',
          ];
        })}
      />
    </div>
  );
}
