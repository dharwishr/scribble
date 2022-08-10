# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { "/#{Faker::Internet.slug}" }
    to { "/#{Faker::Internet.slug}" }
  end
end
