# frozen_string_literal: true

class Settings < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  validates :name, presence: true, length: { maximum: 35 }
  validates :password, length: { minimum: 6 }, if: :password_enabled
end
