# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { Faker::Name.unique.name }
    position { Random.rand(0...42) }
  end
end
