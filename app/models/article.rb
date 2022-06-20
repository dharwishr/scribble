# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category, foreign_key: "assigned_category_id", class_name: "Category"
  belongs_to :user, foreign_key: "article_owner_id", class_name: "User"
  validates :title, presence: true, length: { maximum: 50 }
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
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
