# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 50
  enum status: { draft: 0, published: 1 }

  belongs_to :category, foreign_key: "assigned_category_id", class_name: "Category"
  belongs_to :user, foreign_key: "article_owner_id", class_name: "User"
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :slug, uniqueness: true
  validate :slug_not_changed
  before_create :set_slug

  private

    def self.of_status(status)
      if status == :draft
        articles = draft.order("updated_at DESC")
      else
        articles = published.order("updated_at DESC")
      end
      articles
    end

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
