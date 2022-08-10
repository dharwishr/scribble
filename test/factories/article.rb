# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :category_id, factory: :category
    title { Faker::Lorem.sentence[0..49] }
    body { Faker::Lorem.sentence[0..200] }
    status { "published" }
  end
end
