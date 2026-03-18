from __future__ import annotations

import json
import random
from collections import Counter
from dataclasses import asdict, dataclass
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

random.seed(42)
ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / 'lib/mock/generated-data.json'
OUT_TS = ROOT / 'lib/mock/generated-data.ts'
OUT_SQL = ROOT / 'supabase/seed.sql'

TODAY = date(2026, 3, 18)
NOW = datetime(2026, 3, 18, 12, 0, 0)


def iso_day(offset: int) -> str:
    return (TODAY + timedelta(days=offset)).isoformat()


def iso_dt(offset_days: int, hour: int = 9) -> str:
    return (NOW + timedelta(days=offset_days, hours=hour - NOW.hour)).isoformat()


users = [
    {'id': 'usr_sawant', 'name': 'Sawant', 'role': 'Builder / Requester'},
    {'id': 'usr_biplob', 'name': 'Biplob', 'role': 'Procurement / Stores'},
    {'id': 'usr_lincoln', 'name': 'Lincoln', 'role': 'Approver'},
    {'id': 'usr_lindsey', 'name': 'Lindsey', 'role': 'Approver'},
    {'id': 'usr_galvin', 'name': 'Galvin', 'role': 'QC / Inventory'},
    {'id': 'usr_finance', 'name': 'Finance Department', 'role': 'Finance'},
]

phases = [
    'Hull Fabrication', 'Piping', 'Electrical', 'HVAC', 'Outfitting',
    'Painting', 'Mechanical', 'Commissioning'
]
units = ['Nos', 'Kg', 'Mtr', 'Ltr', 'Set']
locations = ['Warehouse', 'Store Room 1', 'Store Room 2']
categories = ['Steel', 'Pipe', 'Cable', 'Coating', 'Fastener', 'Machinery', 'Safety', 'Consumable']

items = [
    ('Marine Grade Steel Plate', 'AH36 steel plate 12mm', 'Steel', 'Nos'),
    ('Steel Angle', 'L-angle 75x75x6mm', 'Steel', 'Nos'),
    ('Pipe Spool', 'CS seamless pipe spool 4 inch', 'Pipe', 'Nos'),
    ('Stainless Tube', 'SS316 instrumentation tube', 'Pipe', 'Mtr'),
    ('Cable Tray', 'Hot dip galvanized tray 300mm', 'Cable', 'Nos'),
    ('Power Cable', 'XLPE armored cable 4C x 25 sqmm', 'Cable', 'Mtr'),
    ('Control Cable', 'Shielded control cable 12 pair', 'Cable', 'Mtr'),
    ('Primer Paint', 'Epoxy zinc rich primer', 'Coating', 'Ltr'),
    ('Top Coat Paint', 'Marine polyurethane top coat', 'Coating', 'Ltr'),
    ('Anchor Bolt', 'M24 anchor bolt with nut', 'Fastener', 'Nos'),
    ('Hex Bolt Set', 'M16 bolt nut washer set', 'Fastener', 'Set'),
    ('Gasket Sheet', 'Non asbestos gasket sheet', 'Consumable', 'Nos'),
    ('Welding Rod', 'E7018 low hydrogen rod', 'Consumable', 'Kg'),
    ('Grinding Disc', '7 inch grinding disc', 'Consumable', 'Nos'),
    ('Valve Gate', 'Gate valve class 150', 'Machinery', 'Nos'),
    ('Valve Globe', 'Globe valve class 150', 'Machinery', 'Nos'),
    ('Pump Coupling', 'Flexible coupling for transfer pump', 'Machinery', 'Nos'),
    ('Air Vent Head', 'Marine certified air vent head', 'Machinery', 'Nos'),
    ('Rubber Mat', 'Anti-slip deck mat', 'Safety', 'Nos'),
    ('Safety Signage', 'Photoluminescent emergency sign', 'Safety', 'Nos'),
    ('Insulation Roll', 'Rockwool insulation 50mm', 'Consumable', 'Nos'),
    ('Copper Lug', 'Tin plated copper lug 35 sqmm', 'Cable', 'Nos'),
    ('Cable Gland', 'Brass double compression gland', 'Cable', 'Nos'),
    ('Pipe Support', 'Adjustable pipe support', 'Pipe', 'Nos'),
    ('Deck Grating', 'FRP grating panel', 'Steel', 'Nos'),
    ('Fire Door', 'A60 class fire door', 'Safety', 'Nos'),
    ('Ventilation Damper', 'Motorized damper', 'HVAC', 'Nos'),
    ('Duct Section', 'GI duct section 1200x600', 'HVAC', 'Nos'),
    ('Sealant', 'Marine silicone sealant', 'Consumable', 'Nos'),
    ('Bearing Set', 'Deep groove bearing set', 'Machinery', 'Set'),
]

vendors = [
    ('BlueWave Metals', 92, 3, 5, 4.8),
    ('Harbor Industrial Supply', 88, 4, 8, 4.4),
    ('Oceanic Piping Works', 90, 5, 4, 4.6),
    ('KeelLine Cables', 86, 6, 7, 4.2),
    ('Dockside Coatings', 91, 4, 3, 4.7),
    ('Prime Marine Fasteners', 89, 5, 6, 4.5),
    ('Atlas Vessel Systems', 93, 7, 2, 4.9),
    ('YardSafe Equipments', 85, 4, 5, 4.3),
]

req_statuses = [
    'raised', 'procurement_review', 'approved', 'vendor_mapping', 'po_created',
    'advance_requested', 'in_delivery', 'received', 'qc_completed', 'issued', 'closed'
]
payment_statuses = [
    'not_requested', 'advance_requested', 'under_finance_review', 'advance_paid',
    'vendor_confirmed', 'settled', 'on_hold'
]
delivery_statuses = [
    'rfq_sent', 'quote_received', 'vendor_selected', 'po_issued', 'advance_requested',
    'advance_paid', 'vendor_confirmed', 'dispatch_pending', 'dispatched', 'in_transit',
    'reached_yard', 'received', 'under_qc', 'qc_passed', 'qc_partial', 'qc_failed', 'closed'
]

item_records = []
for idx, (name, spec, category, unit) in enumerate(items, start=1):
    item_records.append({
        'id': f'itm_{idx:03d}',
        'name': name,
        'specification': spec,
        'category': category,
        'unit': unit,
        'reorder_level': random.randint(5, 20),
        'preferred_vendor_id': f'ven_{random.randint(1, 8):03d}',
    })

vendor_records = []
for idx, (name, price_score, speed, qc_reject, reliability) in enumerate(vendors, start=1):
    vendor_records.append({
        'id': f'ven_{idx:03d}',
        'name': name,
        'price_score': price_score,
        'avg_delivery_days': speed,
        'qc_rejection_rate': qc_reject,
        'reliability_score': reliability,
        'contact_person': ['Arif', 'Meera', 'Sanjay', 'Tariq', 'Nabila', 'Rakesh', 'Mira', 'Dev'][idx-1],
        'storage_path': f'vendors/{name.lower().replace(" ", "-")}/profile.jpg',
    })

requirements = []
reviews = []
approvals = []
comparisons = []
pos = []
po_items = []
payment_requests = []
payment_transactions = []
delivery_events = []
receipts = []
qc_records = []
inventory_items = []
inventory_movements = []
issue_records = []
recovery_records = []
reuse_reviews = []
ai_recommendations = []
alerts = []
weekly_reports = []
attachments = []
audit_logs = []

for i in range(1, 21):
    item = item_records[(i * 3) % len(item_records)]
    qty = random.randint(5, 80)
    req_id = f'req_{i:03d}'
    status = req_statuses[min(len(req_statuses) - 1, i // 2)]
    requirements.append({
        'id': req_id,
        'request_no': f'REQ-2026-{1000+i}',
        'ship_name': 'MV Horizon One',
        'yard_name': 'East Dock Yard',
        'item_id': item['id'],
        'item_name': item['name'],
        'specification': item['specification'],
        'quantity': qty,
        'unit': item['unit'],
        'required_by_date': iso_day(i % 12 + 2),
        'phase': phases[i % len(phases)],
        'urgency': ['Normal', 'High', 'Critical'][i % 3],
        'note': f'Needed for {phases[i % len(phases)]} work package and onboard integration.',
        'status': status,
        'created_at': iso_dt(-30 + i),
        'created_by': 'usr_sawant',
        'reviewed_by': 'usr_biplob' if i > 2 else None,
        'approved_by': 'usr_lincoln' if i % 2 else 'usr_lindsey',
        'image_path': f'requirements/{req_id}/item.jpg' if i % 4 == 0 else None,
    })
    if i % 4 == 0:
        attachments.append({
            'id': f'rat_{i:03d}',
            'requirement_id': req_id,
            'storage_path': f'requirements/{req_id}/item.jpg',
            'caption': 'Site-marked material reference',
        })
    reviews.append({
        'id': f'rev_{i:03d}',
        'requirement_id': req_id,
        'reviewer_id': 'usr_biplob',
        'stock_check_result': random.choice(['stock_available', 'partial_stock', 'no_stock']),
        'reusable_check_result': random.choice(['reusable_available', 'limited_reuse', 'no_reuse']),
        'decision': random.choice(['full_issue', 'partial_procurement', 'full_procurement']),
        'comment': 'Checked warehouse, store rooms, and recovered bins before procurement routing.',
        'created_at': iso_dt(-29 + i),
    })
    approvals.append({
        'id': f'app_{i:03d}',
        'requirement_id': req_id,
        'approver_id': 'usr_lincoln' if i % 2 else 'usr_lindsey',
        'status': 'approved' if i != 7 else 'rejected',
        'comment': 'Approved for prototype planning and vendor engagement.' if i != 7 else 'Need revised specification.',
        'created_at': iso_dt(-28 + i),
    })
    vendor_ids = random.sample(vendor_records, 3)
    recommended = max(vendor_ids, key=lambda v: v['price_score'] + (100 - v['avg_delivery_days']*5) + v['reliability_score']*10 - v['qc_rejection_rate'])
    for rank, vendor in enumerate(vendor_ids, start=1):
        comparisons.append({
            'id': f'cmp_{i:03d}_{rank}',
            'requirement_id': req_id,
            'vendor_id': vendor['id'],
            'price_score': vendor['price_score'] - random.randint(0, 8),
            'delivery_days': vendor['avg_delivery_days'] + random.randint(0, 4),
            'qc_rejection_rate': vendor['qc_rejection_rate'],
            'reliability_score': vendor['reliability_score'],
            'is_ai_recommended': vendor['id'] == recommended['id'],
        })
    ai_recommendations.append({
        'id': f'air_vendor_{i:03d}',
        'context_type': 'vendor_mapping',
        'reference_id': req_id,
        'provider': random.choice(['mock', 'groq', 'gemini']),
        'summary': f"Advisory: {recommended['name']} balances price, delivery, and lower QC rejections for {item['name']}.",
        'confidence_score': round(random.uniform(0.69, 0.93), 2),
        'created_at': iso_dt(-27 + i),
    })

for i in range(1, 16):
    req = requirements[i - 1]
    vendor = vendor_records[i % len(vendor_records)]
    po_id = f'po_{i:03d}'
    pos.append({
        'id': po_id,
        'po_no': f'PO-2026-{2000+i}',
        'requirement_id': req['id'],
        'vendor_id': vendor['id'],
        'status': random.choice(['draft', 'issued', 'partially_received', 'closed']),
        'advance_percentage': random.choice([20, 30, 40]),
        'total_amount': round(random.uniform(5000, 55000), 2),
        'created_at': iso_dt(-20 + i),
        'created_by': 'usr_biplob',
    })
    po_items.append({
        'id': f'poi_{i:03d}',
        'po_id': po_id,
        'item_id': req['item_id'],
        'quantity': req['quantity'],
        'unit_price': round(random.uniform(50, 1200), 2),
        'phase': req['phase'],
    })
    pay_status = payment_statuses[i % len(payment_statuses)]
    payment_requests.append({
        'id': f'payreq_{i:03d}',
        'po_id': po_id,
        'status': pay_status,
        'requested_amount': round(random.uniform(2000, 18000), 2),
        'requested_by': 'usr_biplob',
        'finance_owner': 'usr_finance',
        'created_at': iso_dt(-19 + i),
    })
    payment_transactions.append({
        'id': f'paytx_{i:03d}',
        'payment_request_id': f'payreq_{i:03d}',
        'status': pay_status,
        'transaction_ref': f'FIN-{3000+i}',
        'amount': round(random.uniform(2000, 18000), 2),
        'created_at': iso_dt(-18 + i),
    })
    statuses_for_po = delivery_statuses[: 7 + (i % 8)]
    for e_idx, status in enumerate(statuses_for_po, start=1):
        delivery_events.append({
            'id': f'del_{i:03d}_{e_idx}',
            'po_id': po_id,
            'status': status,
            'event_at': iso_dt(-17 + i + e_idx),
            'owner': random.choice(['usr_biplob', 'usr_finance', 'usr_galvin']),
            'note': f'{status.replace("_", " ").title()} recorded for {po_id}.',
        })

for i in range(1, 11):
    po = pos[i - 1]
    rec_id = f'rcpt_{i:03d}'
    receipts.append({
        'id': rec_id,
        'receipt_no': f'GRN-2026-{4000+i}',
        'po_id': po['id'],
        'received_quantity': random.randint(5, 60),
        'challan_image_path': f'receipts/{rec_id}/challan.jpg',
        'invoice_image_path': f'receipts/{rec_id}/invoice.jpg',
        'received_at': iso_dt(-8 + i),
        'received_by': 'usr_biplob',
    })
    qc_status = random.choice(['passed', 'partial_pass', 'failed'])
    qc_id = f'qc_{i:03d}'
    qc_records.append({
        'id': qc_id,
        'receipt_id': rec_id,
        'status': qc_status,
        'inspector_id': 'usr_galvin',
        'accepted_quantity': random.randint(3, 45),
        'rejected_quantity': random.randint(0, 10),
        'remarks': 'Visual and dimensional checks completed at receiving bay.',
        'created_at': iso_dt(-7 + i),
    })

for i in range(1, 21):
    source_req = requirements[(i * 2) % len(requirements)]
    pin = f'PIN-26-{5000+i}'
    inventory_items.append({
        'id': f'inv_{i:03d}',
        'pin': pin,
        'item_id': source_req['item_id'],
        'item_name': source_req['item_name'],
        'quantity_on_hand': random.randint(3, 90),
        'location': locations[i % len(locations)],
        'status': random.choice(['available', 'reserved', 'issued', 'hold']),
        'phase': source_req['phase'],
        'parent_pin': None,
        'derived_pin_type': None,
        'linked_requirement_id': source_req['id'],
        'linked_po_id': pos[(i - 1) % len(pos)]['id'],
        'linked_receipt_id': receipts[(i - 1) % len(receipts)]['id'] if i <= 10 else None,
        'linked_qc_id': qc_records[(i - 1) % len(qc_records)]['id'] if i <= 10 else None,
        'created_at': iso_dt(-6 + i),
    })
    inventory_movements.append({
        'id': f'mov_{i:03d}',
        'inventory_item_id': f'inv_{i:03d}',
        'movement_type': 'intake',
        'from_location': 'Receiving Bay',
        'to_location': locations[i % len(locations)],
        'quantity': inventory_items[-1]['quantity_on_hand'],
        'created_at': iso_dt(-6 + i),
    })

for i in range(1, 9):
    inv = inventory_items[i - 1]
    issue_id = f'iss_{i:03d}'
    issue_qty = max(1, inv['quantity_on_hand'] // 2)
    issue_records.append({
        'id': issue_id,
        'inventory_item_id': inv['id'],
        'pin': inv['pin'],
        'phase': inv['phase'],
        'quantity': issue_qty,
        'issue_date': iso_day(-i),
        'issued_by': 'usr_biplob',
        'received_by': 'Sawant Team',
        'shipbuilder_name': 'Sawant Build Crew',
    })
    inventory_movements.append({
        'id': f'mov_issue_{i:03d}',
        'inventory_item_id': inv['id'],
        'movement_type': 'issue',
        'from_location': inv['location'],
        'to_location': 'Shipbuilder Front',
        'quantity': issue_qty,
        'created_at': iso_dt(-i),
    })

recovery_types = ['not_used', 'leftover', 'scrap']
recovery_conditions = ['good', 'repairable', 'damaged']
for i in range(1, 7):
    issue = issue_records[i - 1]
    rec_type = recovery_types[(i - 1) % len(recovery_types)]
    rec_id = f'recov_{i:03d}'
    prefix = {'not_used': 'N', 'leftover': 'LF', 'scrap': 'S'}[rec_type]
    recovery_records.append({
        'id': rec_id,
        'issue_record_id': issue['id'],
        'recovery_pin': f'{prefix}-26-{7000+i}',
        'recovery_type': rec_type,
        'quantity': random.randint(1, max(2, issue['quantity'])),
        'condition_status': recovery_conditions[(i - 1) % len(recovery_conditions)],
        'reason': 'Balance returned after onsite fit-up and cutting optimization.',
        'image_path': f'recovery/{rec_id}/photo.jpg',
        'created_at': iso_dt(i),
    })
    recommendation = ['reusable_as_is', 'reusable_after_rework', 'hold', 'not_reusable'][i % 4]
    reuse_reviews.append({
        'id': f'reuse_{i:03d}',
        'recovery_record_id': rec_id,
        'ai_recommendation': recommendation,
        'human_decision': 'reuse' if recommendation != 'not_reusable' else 'scrap',
        'reviewed_by': 'usr_galvin',
        'created_at': iso_dt(i + 1),
    })
    ai_recommendations.append({
        'id': f'air_reuse_{i:03d}',
        'context_type': 'reuse_review',
        'reference_id': rec_id,
        'provider': random.choice(['mock', 'groq', 'gemini']),
        'summary': f'Advisory: {recommendation.replace("_", " ")} for {issue["pin"]} based on quantity, condition, and prior use history.',
        'confidence_score': round(random.uniform(0.62, 0.89), 2),
        'created_at': iso_dt(i + 1),
    })
    inventory_items.append({
        'id': f'inv_derived_{i:03d}',
        'pin': f'{prefix}-26-{7000+i}',
        'item_id': inventory_items[i - 1]['item_id'],
        'item_name': inventory_items[i - 1]['item_name'],
        'quantity_on_hand': recovery_records[-1]['quantity'],
        'location': 'Store Room 2' if rec_type != 'scrap' else 'Warehouse',
        'status': 'available' if rec_type != 'scrap' else 'hold',
        'phase': issue['phase'],
        'parent_pin': issue['pin'],
        'derived_pin_type': prefix,
        'linked_requirement_id': inventory_items[i - 1]['linked_requirement_id'],
        'linked_po_id': inventory_items[i - 1]['linked_po_id'],
        'linked_receipt_id': inventory_items[i - 1]['linked_receipt_id'],
        'linked_qc_id': inventory_items[i - 1]['linked_qc_id'],
        'created_at': iso_dt(i + 2),
    })

for i in range(1, 9):
    alerts.append({
        'id': f'alert_{i:03d}',
        'type': random.choice(['payment', 'delivery', 'qc', 'inventory', 'reuse']),
        'severity': random.choice(['low', 'medium', 'high']),
        'title': random.choice([
            'Advance payment awaiting finance review',
            'QC partial pass requires segregation',
            'Recovered material ready for reuse review',
            'Requirement nearing required-by date',
        ]),
        'message': 'Operational signal generated by seeded workflow data.',
        'status': random.choice(['open', 'acknowledged', 'closed']),
        'created_at': iso_dt(-2 + i),
    })

for i in range(1, 5):
    weekly_reports.append({
        'id': f'wrep_{i:03d}',
        'week_start': iso_day(-(i * 7)),
        'week_end': iso_day(-(i * 7) + 6),
        'requirements_raised': random.randint(3, 8),
        'pos_created': random.randint(2, 5),
        'receipts_completed': random.randint(1, 4),
        'recoveries_logged': random.randint(0, 3),
        'narrative': 'Weekly summary prepared for yard material control review.',
    })

for req in requirements[:10]:
    audit_logs.append({
        'id': f'aud_{req["id"]}',
        'entity_type': 'requirement',
        'entity_id': req['id'],
        'action': 'status_transition',
        'performed_by': 'usr_biplob',
        'details': f"Requirement moved to {req['status']}",
        'created_at': req['created_at'],
    })

summary = {
    'counts': {
        'items': len(item_records),
        'vendors': len(vendor_records),
        'requirements': len(requirements),
        'purchaseOrders': len(pos),
        'receipts': len(receipts),
        'qcRecords': len(qc_records),
        'inventoryItems': len(inventory_items),
        'issueRecords': len(issue_records),
        'recoveryRecords': len(recovery_records),
        'aiRecommendations': len(ai_recommendations),
        'alerts': len(alerts),
        'weeklyReports': len(weekly_reports),
    },
    'statusCounters': {
        'requirements': dict(Counter(r['status'] for r in requirements)),
        'payments': dict(Counter(p['status'] for p in payment_requests)),
        'deliveries': dict(Counter(d['status'] for d in delivery_events)),
        'qc': dict(Counter(q['status'] for q in qc_records)),
        'inventory': dict(Counter(i['status'] for i in inventory_items)),
    }
}

dataset: dict[str, Any] = {
    'meta': {
        'generatedAt': NOW.isoformat(),
        'ship': 'MV Horizon One',
        'yard': 'East Dock Yard',
        'warehouse': 'Central Warehouse',
        'storeRooms': ['Store Room 1', 'Store Room 2'],
        'summary': summary,
    },
    'users': users,
    'phases': phases,
    'units': units,
    'locations': locations,
    'categories': categories,
    'items': item_records,
    'vendors': vendor_records,
    'requirements': requirements,
    'requirementAttachments': attachments,
    'reviews': reviews,
    'approvals': approvals,
    'vendorComparisons': comparisons,
    'purchaseOrders': pos,
    'purchaseOrderItems': po_items,
    'paymentRequests': payment_requests,
    'paymentTransactions': payment_transactions,
    'deliveryEvents': delivery_events,
    'receipts': receipts,
    'qcRecords': qc_records,
    'inventoryItems': inventory_items,
    'inventoryMovements': inventory_movements,
    'issueRecords': issue_records,
    'recoveryRecords': recovery_records,
    'reuseReviews': reuse_reviews,
    'aiRecommendations': ai_recommendations,
    'alerts': alerts,
    'weeklyReports': weekly_reports,
    'auditLogs': audit_logs,
}

OUT_JSON.write_text(json.dumps(dataset, indent=2))
OUT_TS.write_text(
    "import seedData from './generated-data.json';\n\n"
    "export const generatedData = seedData;\n"
    "export type GeneratedData = typeof generatedData;\n"
)

# Seed SQL with json blobs for prototype loading into staging tables.
def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"

lines = [
    '-- Prototype seed generated by scripts/generate_seed_data.py',
    'create schema if not exists prototype;',
    'create table if not exists prototype.seed_payloads (',
    '  key text primary key,',
    '  payload jsonb not null,',
    '  inserted_at timestamptz not null default now()',
    ');',
]
for key, value in dataset.items():
    lines.append(
        f"insert into prototype.seed_payloads (key, payload) values ({sql_quote(key)}, {sql_quote(json.dumps(value))}) on conflict (key) do update set payload = excluded.payload, inserted_at = now();"
    )
OUT_SQL.write_text('\n'.join(lines) + '\n')
print('Generated dataset:', summary['counts'])
