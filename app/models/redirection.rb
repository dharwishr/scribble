# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validate :check_both_input_not_same
  validate :check_white_space_not_exist
  validate :check_loop_redirection_not_exist

  private

    def check_both_input_not_same
      errors.add(:base, t("redirection.same_value")) if from == to
    end

    def check_white_space_not_exist
      errors.add(:base, t("redirection.whitespace")) if from.match(/\s/) || to.match(/\s/)
    end

    def check_loop_redirection_not_exist
      next_path = to
      while (r = Redirection.find_by(from: next_path))
        if r.to === from
          errors.add(:base, t("redirection.redirection_loop"))
          break
        end
        next_path = r.to
      end
    end

    def check_input_starts_with_slash
      errors.add(:base, t("redirection.input_not_starts_with_slash")) if from.start_with?("/") && to.start_with?("/")
    end
end
