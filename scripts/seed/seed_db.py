from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
DATA_FILE = ROOT / 'src' / 'mock' / 'generated-data.json'
TABLE_ORDER = [
    'roles',
    'users',
    'units',
    'categories',
    'locations',
    'phases',
    'vendors',
    'items',
    'requirements',
    'reviews',
    'approvals',
    'vendor_comparisons',
    'purchase_orders',
    'purchase_order_items',
    'payment_requests',
    'payment_transactions',
    'delivery_events',
    'receipts',
    'qc_records',
    'inventory_items',
    'inventory_movements',
    'issue_records',
    'recovery_records',
    'reuse_reviews',
    'ai_recommendations',
    'alerts',
    'weekly_reports',
    'audit_logs',
]


def upsert_rows(base_url: str, key: str, table: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return

    query = urlencode({'on_conflict': 'id'})
    url = f"{base_url}/rest/v1/{table}?{query}"
    body = json.dumps(rows).encode('utf-8')
    request = Request(
        url,
        data=body,
        method='POST',
        headers={
            'apikey': key,
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates',
        },
    )

    try:
        with urlopen(request, timeout=60) as response:
            response.read()
    except HTTPError as exc:
        details = exc.read().decode('utf-8', errors='ignore')
        raise SystemExit(f'Failed to seed {table}: HTTP {exc.code} {details}') from exc

    print(f'Upserted {len(rows)} rows into {table}')


def main() -> None:
    supabase_url = os.getenv('SUPABASE_URL')
    service_role = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    if not supabase_url or not service_role:
        raise SystemExit('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running the DB seed.')

    payload = json.loads(DATA_FILE.read_text())
    base_url = supabase_url.rstrip('/')

    for table in TABLE_ORDER:
        upsert_rows(base_url, service_role, table, payload.get(table, []))


if __name__ == '__main__':
    main()
