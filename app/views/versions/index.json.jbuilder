# frozen_string_literal: true

json.versions @article.versions do | version |
  json.extract! version,
    :event,
    :id
  json.time version.created_at.strftime("%I:%M%p, %d/%m/%y")
end
