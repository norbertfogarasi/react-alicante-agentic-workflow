-- Every session gets a level, the same reasoning as `track`: an enum keeps
-- the allowed values in the schema, so `pnpm db:types` generates a union
-- type for them instead of a hand-maintained one.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Added nullable first so the 8 existing rows can be backfilled below before
-- the column is locked down to not-null.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'intermediate' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

-- No RLS/grant changes needed: the existing "Sessions are publicly readable"
-- policy and select grant are per-row, not per-column, so they already cover
-- this new column.
