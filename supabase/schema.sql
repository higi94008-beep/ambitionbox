create extension if not exists "uuid-ossp";

create table if not exists public.page_sections (
  id uuid primary key default uuid_generate_v4(),
  page_slug text not null default 'company-profile',
  section_type text not null,
  title text not null,
  subtitle text,
  content jsonb not null default '{}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_slug, section_type)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists page_sections_set_updated_at on public.page_sections;
create trigger page_sections_set_updated_at
before update on public.page_sections
for each row execute function public.set_updated_at();

alter table public.page_sections enable row level security;

drop policy if exists "Public can read visible sections" on public.page_sections;
create policy "Public can read visible sections"
on public.page_sections for select
to anon, authenticated
using (is_visible = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated users can insert sections" on public.page_sections;
create policy "Authenticated users can insert sections"
on public.page_sections for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update sections" on public.page_sections;
create policy "Authenticated users can update sections"
on public.page_sections for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete sections" on public.page_sections;
create policy "Authenticated users can delete sections"
on public.page_sections for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('cms-media','cms-media',true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view CMS media" on storage.objects;
create policy "Public can view CMS media"
on storage.objects for select
to public
using (bucket_id = 'cms-media');

drop policy if exists "Authenticated users can upload CMS media" on storage.objects;
create policy "Authenticated users can upload CMS media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cms-media');

drop policy if exists "Authenticated users can update CMS media" on storage.objects;
create policy "Authenticated users can update CMS media"
on storage.objects for update
to authenticated
using (bucket_id = 'cms-media')
with check (bucket_id = 'cms-media');

drop policy if exists "Authenticated users can delete CMS media" on storage.objects;
create policy "Authenticated users can delete CMS media"
on storage.objects for delete
to authenticated
using (bucket_id = 'cms-media');

insert into public.page_sections (page_slug,section_type,title,subtitle,content,sort_order,is_visible)
values
('company-profile','banner','Banner',null,'{"eyebrow":"Madhu Jayanti International Pvt Ltd","headline":"Nobody knows tea better!","cta_label":"Explore MJIPL","cta_url":"https://www.jaytea.com/about-us","overlay":"35"}'::jsonb,1,true),
('company-profile','company_header','Madhu Jayanti International Pvt Ltd',null,'{"company_name":"Madhu Jayanti International Pvt Ltd (MJIPL)","tagline":"Tea innovation since 1942","founded":"1942","headquarters":"Kolkata, West Bengal, India","employee_count":"Global tea business","website":"https://www.jaytea.com/"}'::jsonb,2,true),
('company-profile','about','About MJIPL',null,'{"statement":"Selling tea since 1942","body":"MJIPL has built a global tea business around sourcing, blending, packaging, innovation and responsible growth.","stats":[{"value":"1000+","label":"Tea varieties"},{"value":"4","label":"Factories"},{"value":"15 million","label":"Cups a day"},{"value":"42","label":"Countries served"}]}'::jsonb,3,true),
('company-profile','leaders','Our Leaders',null,'{"intro":"Meet the people helping shape the next chapter of MJIPL.","items":[]}'::jsonb,4,true),
('company-profile','benefits','Perks & Benefits',null,'{"items":[{"icon":"♥","title":"Employee Wellbeing","description":"Add your wellbeing programmes, insurance and support policies from admin."},{"icon":"↗","title":"Learning & Growth","description":"Add development programmes, learning support and career opportunities."},{"icon":"◎","title":"Rewards & Recognition","description":"Add your compensation, recognition and employee benefit information."}]}'::jsonb,5,true),
('company-profile','chro','Message from CHRO',null,'{"name":"CHRO","designation":"Chief Human Resources Officer","message":"Use the admin panel to add the CHRO message, photograph and optional link."}'::jsonb,6,true),
('company-profile','dei','Inclusion, Equity and Diversity at MJIPL',null,'{"headline":"Building an environment where people can thrive","body":"Add MJIPL’s inclusion, equity and diversity commitments here from the admin panel."}'::jsonb,7,true),
('company-profile','sustainability','Sustainability',null,'{"headline":"Committed to responsible growth","body":"MJIPL states that it aims to produce tea sustainably by combining environmental, social and ethical principles.","stats":[{"value":"62%","label":"Raw materials from sustainability-committed estates"},{"value":"44%","label":"Raw materials from organic tea estates"},{"value":"18,000 kWh/day","label":"Clean energy generated by windmills"}],"cta_label":"Our Sustainability Story","cta_url":"https://www.jaytea.com/sustainability-story"}'::jsonb,8,true),
('company-profile','csr','Corporate Social Responsibility',null,'{"intro":"Showcase MJIPL’s community programmes, education, livelihood, health and environmental initiatives.","items":[]}'::jsonb,9,true),
('company-profile','awards','Our Awards & Recognitions',null,'{"items":[]}'::jsonb,10,true),
('company-profile','achievements','MJIPL Achievements',null,'{"items":[{"value":"80+ years","title":"Tea heritage","description":"A long-standing tea business with global operations."},{"value":"1000+","title":"Varieties","description":"Black, green, white, herbal and naturally flavoured teas."},{"value":"4","title":"Factories","description":"Integrated manufacturing footprint."},{"value":"42","title":"Countries","description":"Tea served across global markets."}]}'::jsonb,11,true),
('company-profile','life','Life at MJIPL',null,'{"intro":"Share people stories, workplaces, celebrations, learning and life across MJIPL.","items":[]}'::jsonb,12,true),
('company-profile','reviews','MJIPL Reviews',null,'{"rating":"0.0","review_count":"0","items":[]}'::jsonb,13,true),
('company-profile','creche','Creche Facility at MJIPL',null,'{"body":"Add details, images and policies for childcare and parent support here."}'::jsonb,14,true),
('company-profile','communities','Transforming Communities across India',null,'{"body":"Add MJIPL community projects and their locations here.","items":[]}'::jsonb,15,true),
('company-profile','jobs','MJIPL Job Openings',null,'{"intro":"Join the world of tea innovation.","items":[]}'::jsonb,16,true),
('company-profile','locations','MJIPL Office Locations',null,'{"items":[{"office_name":"Corporate Office","city":"Kolkata","state":"West Bengal","country":"India","address":"Bio-Wonder, 15th Floor, 789, Anandapur Main Road, Kolkata 700107","phone":"+91 33 6657 4100","email":"info@jaytea.com"}]}'::jsonb,17,true),
('company-profile','connect','Connect with us',null,'{"website":"https://www.jaytea.com/","email":"info@jaytea.com","phone":"+91 33 6657 4100","socials":[]}'::jsonb,18,true),
('company-profile','faqs','MJIPL FAQs',null,'{"items":[{"question":"When was MJIPL founded?","answer":"MJIPL has been selling tea since 1942."},{"question":"Where is MJIPL headquartered?","answer":"MJIPL is headquartered in Kolkata, West Bengal, India."},{"question":"How can I explore careers at MJIPL?","answer":"Visit the MJIPL careers page or use the job openings section above."}]}'::jsonb,19,true)
on conflict (page_slug, section_type) do nothing;
