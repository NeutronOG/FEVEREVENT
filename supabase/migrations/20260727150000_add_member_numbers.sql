-- One card per email for this private invitation, with a permanent member number.
alter table public.honored_guests
  drop constraint if exists honored_guests_invitation_token_key;

create sequence if not exists public.honored_guest_member_number_seq
  start with 17;

alter table public.honored_guests
  add column if not exists member_number bigint;

alter table public.honored_guests
  alter column member_number set default nextval('public.honored_guest_member_number_seq');

update public.honored_guests
set member_number = nextval('public.honored_guest_member_number_seq')
where member_number is null;

select setval(
  'public.honored_guest_member_number_seq',
  greatest(
    coalesce((select max(member_number) from public.honored_guests), 16),
    16
  ) + 1,
  false
);

alter sequence public.honored_guest_member_number_seq
  owned by public.honored_guests.member_number;

alter table public.honored_guests
  alter column member_number set not null;

create unique index if not exists honored_guests_member_number_unique
  on public.honored_guests (member_number);

create unique index if not exists honored_guests_invitation_email_unique
  on public.honored_guests (invitation_token, email);
