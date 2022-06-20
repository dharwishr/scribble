# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :assigned_category_id, factory: :category
    title { Faker::Lorem.sentence[0..49] }
    body { Faker::Lorem.sentence[0..200] }
    author { Faker::Name.name }
    status { "published" }
  end
end
