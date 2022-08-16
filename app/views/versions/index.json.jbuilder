json.versions @article.versions do | version |
  json.event version.event
  json.id version.id
  json.time version.created_at.strftime("%I:%M%p, %d/%m/%y")
end
