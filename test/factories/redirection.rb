# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { Faker::Name.first_name.gsub(/\W/, "") }
    to { Faker::Name.first_name.gsub(/\W/, "") }
  end
end
