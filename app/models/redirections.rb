# frozen_string_literal: true

class Redirections < ApplicationRecord
  validates :from, presence: true, format: { without: /\s/ }
  validates :to, format: { without: /\s/ }
end
