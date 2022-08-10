# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  MAX_EMAIL_LENGTH = 255
  MAX_USER_NAME_LENGTH = 35
  has_many :articles
  validates :name, presence: true, length: { maximum: MAX_USER_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
