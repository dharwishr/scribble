# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Company.name[0..20] }
    password { Faker::Alphanumeric.unique.alpha(number: 8) }
    is_password_enabled { Faker::Boolean.boolean }
    authentication_token { Faker::Alphanumeric.unique.alpha(number: 24) }
  end
end
