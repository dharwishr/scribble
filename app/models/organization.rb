# frozen_string_literal: true

class Organization < ApplicationRecord
  has_secure_password validations: false
  has_secure_token :authentication_token
  validates :name, presence: true, length: { maximum: 35 }
  validates :password, length: { minimum: 6 }, if: -> { is_password_enabled && password.present? }
end
