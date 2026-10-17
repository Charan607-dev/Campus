
insert into public.rewards (title, description, points_required)
values
  ('Campus Contributor', 'Earn points by contributing useful campus items.', 50),
  ('Community Helper', 'Help other students find what they need.', 100),
  ('Campus Champion', 'Become an active contributor to CampusFind.', 250)
on conflict do nothing;
