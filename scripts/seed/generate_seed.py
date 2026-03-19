from __future__ import annotations

import json
import random
from datetime import date, datetime, timedelta
from pathlib import Path

random.seed(42)
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'src' / 'mock' / 'generated-data.json'

TODAY = date(2026, 3, 18)

roles = [
    {"id": "role-builder", "name": "Builder / Requester"},
    {"id": "role-procurement", "name": "Procurement Manager"},
    {"id": "role-approver", "name": "Approver"},
    {"id": "role-store", "name": "Receiving / Store Officer"},
    {"id": "role-qc", "name": "QC / QA"},
    {"id": "role-finance", "name": "Finance"},
]

users = [
    {"id": "user-sawant", "name": "Sawant", "role_id": "role-builder"},
    {"id": "user-biplob", "name": "Biplob", "role_id": "role-procurement"},
    {"id": "user-lincoln", "name": "Lincoln", "role_id": "role-approver"},
    {"id": "user-lindsey", "name": "Lindsey", "role_id": "role-approver"},
    {"id": "user-galvin", "name": "Galvin", "role_id": "role-qc"},
    {"id": "user-finance", "name": "Finance Department", "role_id": "role-finance"},
]

units = [
    {"id": "unit-nos", "name": "Nos"},
    {"id": "unit-meter", "name": "Meter"},
    {"id": "unit-kg", "name": "Kg"},
    {"id": "unit-set", "name": "Set"},
    {"id": "unit-roll", "name": "Roll"},
]

categories = [
    {"id": "cat-consumable", "name": "consumable"},
    {"id": "cat-fixed", "name": "fixed"},
    {"id": "cat-semi-fixed", "name": "semi-fixed"},
]

locations = [
    {"id": "loc-warehouse", "name": "Warehouse"},
    {"id": "loc-sr1", "name": "Store Room 1"},
    {"id": "loc-sr2", "name": "Store Room 2"},
]

phases = [
    {"id": f"phase-{i+1}", "name": name}
    for i, name in enumerate([
        "Hull Fabrication",
        "Piping",
        "Electrical",
        "Accommodation",
        "Deck Machinery",
        "Outfitting",
    ])
]

vendors = []
for idx, name in enumerate([
    "OceanForge Supplies",
    "Harbor Industrial Co.",
    "BlueKeel Metals",
    "AnchorLine Engineering",
    "North Dock Cables",
    "Triton Marine Consumables",
    "YardGrid Fabrication",
    "Bulkhead Components Ltd.",
]):
    vendors.append({
        "id": f"vendor-{idx+1}",
        "name": name,
        "price_score": random.randint(68, 92),
        "delivery_score": random.randint(65, 96),
        "qc_rejection_rate": round(random.uniform(1.2, 8.7), 1),
        "reliability_score": random.randint(70, 95),
        "previous_performance_score": random.randint(72, 97),
        "lead_time_days": random.randint(3, 14),
    })

item_templates = [
    ("Welding Electrode E6013", "4mm low hydrogen rod", "unit-kg", "cat-consumable"),
    ("Steel Plate AH36", "12mm class certified", "unit-meter", "cat-fixed"),
    ("Pipe Elbow CS", "DN80 Sch40 seamless", "unit-nos", "cat-semi-fixed"),
    ("Marine Cable", "4C x 16 sqmm flame retardant", "unit-roll", "cat-fixed"),
    ("Primer Coating", "Epoxy zinc rich 20L", "unit-set", "cat-consumable"),
    ("Valve Gate", "2 inch bronze body", "unit-nos", "cat-fixed"),
    ("Fastener Kit", "SS316 mixed bolt pack", "unit-set", "cat-consumable"),
    ("Deck Light", "LED weatherproof 220V", "unit-nos", "cat-fixed"),
    ("Cable Tray", "GI perforated 300mm", "unit-meter", "cat-fixed"),
    ("Grinding Disc", "7 inch metal cutting", "unit-nos", "cat-consumable"),
]
items = []
for idx in range(30):
    base = item_templates[idx % len(item_templates)]
    items.append({
        "id": f"item-{idx+1}",
        "name": f"{base[0]} {idx+1:02d}",
        "specification": base[1],
        "unit_id": base[2],
        "category_id": base[3],
        "default_vendor_id": random.choice(vendors)["id"],
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
audit_logs = []

status_cycle = ["raised", "under_review", "approved", "po_created", "in_delivery", "received", "in_inventory", "issued"]
payment_cycle = ["not_requested", "advance_requested", "under_finance_review", "advance_paid", "vendor_confirmed", "settled", "on_hold"]
delivery_cycle = ["RFQ sent", "Quote received", "Vendor selected", "PO issued", "Advance requested", "Advance paid", "Vendor confirmed", "Dispatch pending", "Dispatched", "In transit", "Reached yard", "Received", "Under QC", "QC passed", "Closed"]
qc_statuses = ["passed", "partial", "failed"]
recovery_types = ["N", "LF", "S"]
reuse_options = ["reusable as-is", "reusable after rework", "hold", "not reusable"]

for idx in range(20):
    item = items[idx]
    req_id = f"req-{idx+1}"
    created_on = TODAY - timedelta(days=idx * 2)
    qty = random.randint(5, 80)
    req_status = status_cycle[min(idx // 3, len(status_cycle) - 1)]
    requirements.append({
        "id": req_id,
        "item_id": item["id"],
        "item_name": item["name"],
        "specification": item["specification"],
        "quantity": qty,
        "unit_id": item["unit_id"],
        "required_by_date": str(created_on + timedelta(days=random.randint(4, 21))),
        "phase_id": random.choice(phases)["id"],
        "urgency": random.choice(["low", "medium", "high", "critical"]),
        "note": f"Needed for {random.choice(['block fabrication', 'cable routing', 'machinery foundation', 'paint touch-up'])}.",
        "image_path": f"requirement-images/{req_id}.jpg" if idx % 3 == 0 else None,
        "ship_name": "MV Horizon Pioneer",
        "yard_name": "Haldia Leased Yard",
        "status": req_status,
        "created_at": datetime.combine(created_on, datetime.min.time()).isoformat(),
        "created_by": "user-sawant",
    })
    reviews.append({
        "id": f"review-{idx+1}",
        "requirement_id": req_id,
        "reviewer_id": "user-biplob",
        "stock_on_hand": random.randint(0, 30),
        "recovered_stock": random.randint(0, 20),
        "decision": random.choice(["full_issue_from_inventory", "partial_issue_procure_balance", "full_fresh_procurement"]),
        "review_note": "Reviewed against live stock, recovered stock, and urgent phase demand.",
    })
    approvals.append({
        "id": f"approval-{idx+1}",
        "requirement_id": req_id,
        "approver_id": random.choice(["user-lincoln", "user-lindsey"]),
        "status": "approved" if idx < 16 else random.choice(["approved", "rejected", "pending"]),
        "remark": random.choice(["Approved for urgent execution.", "Approved subject to QC preference.", "Awaiting budget note."]),
    })
    audit_logs.append({
        "id": f"audit-req-{idx+1}",
        "entity_type": "requirement",
        "entity_id": req_id,
        "action": "created",
        "payload": {"status": req_status, "quantity": qty},
        "created_at": datetime.combine(created_on, datetime.min.time()).isoformat(),
        "created_by": "user-sawant",
    })

for idx in range(15):
    req = requirements[idx]
    po_id = f"po-{idx+1}"
    vendor = random.choice(vendors)
    po_date = TODAY - timedelta(days=idx + 10)
    pos.append({
        "id": po_id,
        "po_number": f"PO-2026-{idx+1:03d}",
        "vendor_id": vendor["id"],
        "requirement_id": req["id"],
        "status": random.choice(["draft", "issued", "partially_received", "closed"]),
        "payment_status": payment_cycle[min(idx % len(payment_cycle), len(payment_cycle)-1)],
        "delivery_status": random.choice(delivery_cycle[2:]),
        "po_date": str(po_date),
        "expected_delivery_date": str(po_date + timedelta(days=vendor['lead_time_days'])),
        "advance_percentage": random.choice([20, 30, 40]),
        "created_by": "user-biplob",
    })
    po_items.append({
        "id": f"po-item-{idx+1}",
        "purchase_order_id": po_id,
        "item_id": req["item_id"],
        "quantity": req["quantity"],
        "unit_price": round(random.uniform(25, 850), 2),
        "currency": "USD",
    })
    payment_requests.append({
        "id": f"payment-request-{idx+1}",
        "purchase_order_id": po_id,
        "status": payment_cycle[idx % len(payment_cycle)],
        "amount": round(random.uniform(1000, 18000), 2),
        "requested_on": str(po_date + timedelta(days=1)),
        "requested_by": "user-biplob",
    })
    payment_transactions.append({
        "id": f"payment-tx-{idx+1}",
        "purchase_order_id": po_id,
        "status": random.choice(["advance_paid", "vendor_confirmed", "settled", "on_hold"]),
        "amount": round(random.uniform(500, 12000), 2),
        "transaction_date": str(po_date + timedelta(days=3)),
        "reference_number": f"ADV-{idx+1:04d}",
    })
    comparisons.append({
        "id": f"compare-{idx+1}",
        "requirement_id": req["id"],
        "recommended_vendor_id": vendor["id"],
        "comparison_snapshot": [
            {
                "vendor_id": cand["id"],
                "price_score": cand["price_score"],
                "delivery_score": cand["delivery_score"],
                "qc_rejection_rate": cand["qc_rejection_rate"],
                "reliability_score": cand["reliability_score"],
                "previous_performance_score": cand["previous_performance_score"],
            }
            for cand in random.sample(vendors, 4)
        ],
        "human_selected_vendor_id": vendor["id"],
    })
    for step, status in enumerate(delivery_cycle[: random.randint(6, len(delivery_cycle))]):
        delivery_events.append({
            "id": f"delivery-{idx+1}-{step+1}",
            "purchase_order_id": po_id,
            "status": status,
            "event_date": str(po_date + timedelta(days=step)),
            "note": f"{status} logged for {po_id}.",
        })

for idx in range(10):
    po = pos[idx]
    receipt_id = f"receipt-{idx+1}"
    receipt_date = TODAY - timedelta(days=idx)
    receipts.append({
        "id": receipt_id,
        "purchase_order_id": po["id"],
        "received_quantity": random.randint(5, 60),
        "receipt_date": str(receipt_date),
        "challan_image_path": f"receipt-images/{receipt_id}-challan.jpg",
        "invoice_image_path": f"receipt-images/{receipt_id}-invoice.jpg",
        "photo_paths": [f"receipt-images/{receipt_id}-dock.jpg", f"receipt-images/{receipt_id}-store.jpg"],
    })
    qc_status = qc_statuses[idx % len(qc_statuses)]
    qc_id = f"qc-{idx+1}"
    qc_records.append({
        "id": qc_id,
        "receipt_id": receipt_id,
        "status": qc_status,
        "inspector_id": "user-galvin",
        "accepted_quantity": random.randint(3, 45),
        "rejected_quantity": random.randint(0, 10),
        "remarks": f"QC {qc_status} after dimensional and visual checks.",
    })

for idx in range(20):
    item = items[idx]
    pin = f"PIN-HYD-2026-{idx+1:04d}"
    qty = random.randint(2, 40)
    linked_receipt = receipts[idx % len(receipts)]["id"] if idx < 15 else None
    linked_qc = qc_records[idx % len(qc_records)]["id"] if idx < 15 else None
    inventory_items.append({
        "id": f"inventory-{idx+1}",
        "pin": pin,
        "item_id": item["id"],
        "category_id": item["category_id"],
        "location_id": random.choice(locations)["id"],
        "status": random.choice(["available", "reserved", "issued", "recovered"]),
        "quantity": qty,
        "linked_requirement_id": requirements[idx % len(requirements)]["id"],
        "linked_po_id": pos[idx % len(pos)]["id"] if idx < 15 else None,
        "linked_receipt_id": linked_receipt,
        "linked_qc_id": linked_qc,
        "linked_phase_id": random.choice(phases)["id"],
        "vendor_id": random.choice(vendors)["id"],
        "parent_pin": None,
        "derived_pin_type": None,
        "created_at": datetime.combine(TODAY - timedelta(days=idx), datetime.min.time()).isoformat(),
    })
    inventory_movements.append({
        "id": f"movement-{idx+1}",
        "inventory_item_id": f"inventory-{idx+1}",
        "movement_type": "intake",
        "from_location_id": None,
        "to_location_id": inventory_items[-1]["location_id"],
        "quantity": qty,
        "movement_date": str(TODAY - timedelta(days=idx)),
        "note": "Initial intake into material control stock.",
    })

for idx in range(8):
    inv = inventory_items[idx]
    issue_id = f"issue-{idx+1}"
    issue_qty = random.randint(1, max(2, inv['quantity'] // 2))
    issue_records.append({
        "id": issue_id,
        "inventory_item_id": inv["id"],
        "phase_id": random.choice(phases)["id"],
        "quantity": issue_qty,
        "issue_date": str(TODAY - timedelta(days=idx)),
        "issued_by": "user-biplob",
        "received_by": "user-sawant",
        "remarks": "Issued against active workfront demand.",
    })
    inventory_movements.append({
        "id": f"movement-issue-{idx+1}",
        "inventory_item_id": inv["id"],
        "movement_type": "issue",
        "from_location_id": inv["location_id"],
        "to_location_id": None,
        "quantity": issue_qty,
        "movement_date": str(TODAY - timedelta(days=idx)),
        "note": "Issued to shipbuilder team.",
    })

for idx in range(6):
    issue = issue_records[idx]
    recovery_id = f"recovery-{idx+1}"
    inv = inventory_items[idx]
    rec_type = recovery_types[idx % len(recovery_types)]
    recovery_records.append({
        "id": recovery_id,
        "issue_record_id": issue["id"],
        "inventory_item_id": inv["id"],
        "recovery_type": rec_type,
        "quantity": random.randint(1, max(1, issue['quantity'])),
        "reason": random.choice(["Excess cut length returned", "Unused sealed pack", "Damaged during fit-up"]),
        "condition_status": random.choice(["good", "repairable", "damaged"]),
        "image_path": f"recovery-images/{recovery_id}.jpg",
    })
    derived_pin = f"PIN-HYD-2026-R{idx+1:03d}"
    inventory_items.append({
        "id": f"inventory-recovery-{idx+1}",
        "pin": derived_pin,
        "item_id": inv["item_id"],
        "category_id": inv["category_id"],
        "location_id": random.choice(locations)["id"],
        "status": "recovered",
        "quantity": recovery_records[-1]["quantity"],
        "linked_requirement_id": inv["linked_requirement_id"],
        "linked_po_id": inv["linked_po_id"],
        "linked_receipt_id": inv["linked_receipt_id"],
        "linked_qc_id": inv["linked_qc_id"],
        "linked_phase_id": issue["phase_id"],
        "vendor_id": inv["vendor_id"],
        "parent_pin": inv["pin"],
        "derived_pin_type": rec_type,
        "created_at": datetime.combine(TODAY - timedelta(days=idx), datetime.min.time()).isoformat(),
    })
    reuse_reviews.append({
        "id": f"reuse-{idx+1}",
        "recovery_record_id": recovery_id,
        "suggestion": reuse_options[idx % len(reuse_options)],
        "reviewer_id": "user-galvin",
        "decision": random.choice(["approved for reuse", "hold for rework", "scrap dispose"]),
        "note": "Advisory AI suggestion reviewed by stores and QC.",
        "derived_pin": derived_pin,
    })

for idx in range(6):
    ai_recommendations.append({
        "id": f"ai-{idx+1}",
        "context_type": random.choice(["vendor", "reuse", "dashboard", "pin_journey"]),
        "context_id": random.choice(requirements)["id"],
        "provider": random.choice(["mock", "groq", "gemini"]),
        "summary": random.choice([
            "Vendor 2 balances delivery confidence and low rejection history for urgent deck installation.",
            "Recovered stock can cover the shortfall after minimal rework, reducing fresh procurement risk.",
            "Three urgent requirements need payment follow-up before yard dispatch windows close.",
            "PIN trace shows partial issue, recovered leftover, and successful re-entry to Store Room 1.",
        ]),
        "raw_payload": {"confidence": random.randint(72, 93)},
    })

for idx in range(8):
    alerts.append({
        "id": f"alert-{idx+1}",
        "title": random.choice([
            "Critical requirement overdue",
            "Advance payment pending finance review",
            "QC partial hold awaiting replacement",
            "Recovered stock ready for reuse review",
        ]),
        "severity": random.choice(["low", "medium", "high", "critical"]),
        "module": random.choice(["requirements", "payments", "qc", "reuse"]),
        "linked_id": random.choice(requirements)["id"],
        "message": "Operational attention needed to keep material flow on schedule.",
        "created_at": datetime.combine(TODAY - timedelta(days=idx), datetime.min.time()).isoformat(),
        "is_read": idx > 3,
    })

for idx in range(4):
    week_start = TODAY - timedelta(days=7 * (idx + 1))
    weekly_reports.append({
        "id": f"weekly-{idx+1}",
        "week_start": str(week_start),
        "week_end": str(week_start + timedelta(days=6)),
        "requirements_raised": random.randint(3, 9),
        "pos_issued": random.randint(2, 6),
        "receipts_logged": random.randint(1, 4),
        "qc_failures": random.randint(0, 2),
        "recovery_entries": random.randint(0, 3),
        "narrative": "Steady throughput with tighter attention needed on payment clearance and QC holds.",
    })

payload = {
    "meta": {
        "generated_at": datetime.utcnow().isoformat() + 'Z',
        "ship": "MV Horizon Pioneer",
        "yard": "Haldia Leased Yard",
        "warehouse": "Central Material Warehouse",
    },
    "roles": roles,
    "users": users,
    "units": units,
    "categories": categories,
    "locations": locations,
    "phases": phases,
    "vendors": vendors,
    "items": items,
    "requirements": requirements,
    "reviews": reviews,
    "approvals": approvals,
    "vendor_comparisons": comparisons,
    "purchase_orders": pos,
    "purchase_order_items": po_items,
    "payment_requests": payment_requests,
    "payment_transactions": payment_transactions,
    "delivery_events": delivery_events,
    "receipts": receipts,
    "qc_records": qc_records,
    "inventory_items": inventory_items,
    "inventory_movements": inventory_movements,
    "issue_records": issue_records,
    "recovery_records": recovery_records,
    "reuse_reviews": reuse_reviews,
    "ai_recommendations": ai_recommendations,
    "alerts": alerts,
    "weekly_reports": weekly_reports,
    "audit_logs": audit_logs,
}

OUT.write_text(json.dumps(payload, indent=2))
print(f'Wrote {OUT}')
