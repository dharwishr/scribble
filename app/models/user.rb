# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles, foreign_key: :article_owner_id, class_name: "Article"
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  MAX_EMAIL_LENGTH = 255
  validates :name, presence: true, length: { maximum: 35 }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  before_save :to_lowercase
  has_secure_token :authentication_token

  private

    def to_lowercase
      email.downcase!
    end
end
