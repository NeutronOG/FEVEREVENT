create table public.honored_guests (
  id uuid primary key default gen_random_uuid(),
  invitation_token text not null unique,
  first_name text not null,
  last_name text not null,
  birth_date date not null,
  email text not null,
  qr_token uuid not null unique default gen_random_uuid(),
  wallet_pass_serial text unique,
  wallet_pass_status text not null default 'pending'
    check (wallet_pass_status in ('pending', 'issued', 'revoked')),
  wallet_pass_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.honored_guests enable row level security;

create index honored_guests_email_idx on public.honored_guests (email);

create table public.visitor_devices (
  device_id uuid primary key,
  first_seen_at timestamptz not null default now()
);

alter table public.visitor_devices enable row level security;
